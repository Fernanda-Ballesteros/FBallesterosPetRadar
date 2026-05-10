import { Body, Controller, Get, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';
import type { LostPetCDto } from 'src/core/models/lost-pet.model';

@Controller('lost-pets')
export class LostPetsController {

    constructor(private readonly lostPetsService: LostPetsService) {}

    @Post()
    async createLostPet(@Body() lostPet: LostPetCDto) {
        return this.lostPetsService.createLostPet(lostPet);
    }

    @Get()
    async getActiveLostPets() {
        return this.lostPetsService.getActiveLostPets();
    }
}