import { Body, Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import type { LostPetCDto } from 'src/core/models/lost-pet.model';

@Controller('lost-pets')
export class LostPetsController {

    constructor(private readonly lostPetsService: LostPetsService) {}

    @Post()
    async createLostPet(@Body() lostPet: LostPetCDto) {
        const result = this.lostPetsService.createLostPet(lostPet);
        return result;
    }
}