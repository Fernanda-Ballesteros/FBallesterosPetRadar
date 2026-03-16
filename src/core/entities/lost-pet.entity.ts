import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PetSpecies } from '../enums/pet-species-enum';
import { PetSize } from '../enums/pet-size-enum';
import type { Point } from 'typeorm';

@Entity('lost_pets')
export class LostPet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    species: PetSpecies;

    @Column()
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
    owner_name: string;

    @Column()
    owner_email: string;

    @Column()
    owner_phone: string;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326
    })
    location: Point;

    @Column()
    address: string;

    @Column({ type: 'timestamp' })
    lost_date: Date;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}