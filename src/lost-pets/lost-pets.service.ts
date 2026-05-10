import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/models/lost-pet.model';
import { EmailService } from 'src/email/email.service';
import { EmailOptions } from 'src/core/models/email-options.model';
import { generateLostPetEmailTemplate } from './templates/lost-pet.template';
import { Repository } from 'typeorm';
import { envs } from 'src/config/envs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LostPetsService {

    constructor(
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        private readonly emailService: EmailService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async createLostPet(lostPet: LostPetCDto): Promise<Boolean> {
        const newLostPet = this.lostPetRepository.create({
            name: lostPet.name,
            species: lostPet.species,
            breed: lostPet.breed,
            color: lostPet.color,
            size: lostPet.size,
            description: lostPet.description,
            photo_url: lostPet.photo_url,
            owner_name: lostPet.owner_name,
            owner_email: lostPet.owner_email,
            owner_phone: lostPet.owner_phone,
            address: lostPet.address,
            lost_date: lostPet.lost_date,
            location: {
                type: 'Point',
                coordinates: [lostPet.lon, lostPet.lat]
            }
        });

        await this.lostPetRepository.save(newLostPet);
        await this.cacheManager.del('lost_pets_active'); // invalida caché al crear

        const template = generateLostPetEmailTemplate(lostPet);
        const options: EmailOptions = {
            to: envs.MAILER_EMAIL,
            subject: `🐾 Mascota perdida registrada: ${lostPet.name}`,
            htmlBody: template
        };

        return this.emailService.sendEmail(options);
    }

    async getActiveLostPets(): Promise<LostPet[]> {
        const cached = await this.cacheManager.get<LostPet[]>('lost_pets_active');
        if (cached) return cached;

        const pets = await this.lostPetRepository.find({ where: { is_active: true } });
        await this.cacheManager.set('lost_pets_active', pets, 60000);
        return pets;
    }
}