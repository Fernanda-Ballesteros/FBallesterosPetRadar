import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/entities/found-pet.entity';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { EmailService } from 'src/email/email.service';
import { FoundPetCDto } from 'src/core/models/found-pet.model';
import { EmailOptions } from 'src/core/models/email-options.model';
import { Repository } from 'typeorm';
import { generateFoundPetEmailTemplate } from './templates/found-pet.template';
import { envs } from 'src/config/envs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FoundPetsService {

    constructor(
        @InjectRepository(FoundPet)
        private readonly foundPetRepository: Repository<FoundPet>,
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        private readonly emailService: EmailService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async createFoundPet(foundPet: FoundPetCDto): Promise<Boolean> {
        const newFoundPet = this.foundPetRepository.create({
            species: foundPet.species,
            breed: foundPet.breed,
            color: foundPet.color,
            size: foundPet.size,
            description: foundPet.description,
            photo_url: foundPet.photo_url,
            finder_name: foundPet.finder_name,
            finder_email: foundPet.finder_email,
            finder_phone: foundPet.finder_phone,
            address: foundPet.address,
            found_date: foundPet.found_date,
            location: {
                type: 'Point',
                coordinates: [foundPet.lon, foundPet.lat]
            }
        });

        await this.foundPetRepository.save(newFoundPet);
        await this.cacheManager.del('found_pets'); // invalida caché al crear

        const nearbyLostPets = await this.lostPetRepository.query(`
            SELECT *,
                ST_X(location::geometry) as lon,
                ST_Y(location::geometry) as lat,
                ST_Distance(
                    location,
                    ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
                ) AS distance
            FROM lost_pets
            WHERE is_active = true
                AND ST_DWithin(
                    location,
                    ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
                    500
                )
            ORDER BY distance ASC;
        `, [foundPet.lon, foundPet.lat]);

        if (nearbyLostPets.length > 0) {
            for (const lostPet of nearbyLostPets) {
                const lostPetWithCoords = {
                    ...lostPet,
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(lostPet.lon), parseFloat(lostPet.lat)]
                    }
                };

                
                const template = generateFoundPetEmailTemplate(foundPet, lostPetWithCoords);
                const options: EmailOptions = {
                    to: envs.MAILER_EMAIL,
                    subject: `🐾 Posible coincidencia para ${lostPet.name}`,
                    htmlBody: template
                };
                await this.emailService.sendEmail(options);
            }
        }

        return true;
    }

    async getFoundPets(): Promise<FoundPet[]> {
        const cached = await this.cacheManager.get<FoundPet[]>('found_pets');
        if (cached) return cached;

        const pets = await this.foundPetRepository.find();
        await this.cacheManager.set('found_pets', pets, 60000);
        return pets;
    }
}