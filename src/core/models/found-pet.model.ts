import { PetSpecies } from '../enums/pet-species-enum';
import { PetSize } from '../enums/pet-size-enum';

export interface FoundPetCDto {
    species: PetSpecies;
    breed?: string;
    color: string;
    size: PetSize;
    description: string;
    photo_url?: string;
    finder_name: string;
    finder_email: string;
    finder_phone: string;
    lat: number;
    lon: number;
    address: string;
    found_date: Date;
}