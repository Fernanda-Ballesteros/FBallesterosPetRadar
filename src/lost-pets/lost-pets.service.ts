import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { LostPetCDto } from 'src/core/models/lost-pet.model';
import { EmailService } from 'src/email/email.service';
import { EmailOptions } from 'src/core/models/email-options.model';
import { generateLostPetEmailTemplate } from './templates/lost-pet.template';
import { Repository } from 'typeorm';
import { envs } from 'src/config/envs';

@Injectable()
export class LostPetsService {

    constructor(
        @InjectRepository(LostPet)
        private readonly lostPetRepository: Repository<LostPet>,
        private readonly emailService: EmailService
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

        const template = generateLostPetEmailTemplate(lostPet);
        const options: EmailOptions = {
            to: envs.MAILER_EMAIL,
            subject: `🐾 Mascota perdida registrada: ${lostPet.name}`,
            htmlBody: template
        };

        const result = await this.emailService.sendEmail(options);
        return result;
    }
}