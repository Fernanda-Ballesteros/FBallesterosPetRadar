import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PetSpecies } from '../enums/pet-species-enum';
import { PetSize } from '../enums/pet-size-enum';
import type { Point } from 'typeorm';

@Entity('found_pets')
export class FoundPet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    species: PetSpecies;

    @Column({ nullable: true })
    breed: string;

    @Column()
    color: string;

    @Column()
    size: PetSize;

    @Column({ type: 'text' })
    description: string;

    @Column({ nullable: true })
    photo_url: string;

    @Column()
    finder_name: string;

    @Column()
    finder_email: string;

    @Column()
    finder_phone: string;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location: Point;

    @Column()
    address: string;

    @Column({ type: 'timestamp' })
    found_date: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}