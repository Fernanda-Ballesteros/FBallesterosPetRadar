import { Module } from '@nestjs/common';
import { LostPetsController } from './lost-pets.controller';
import { LostPetsService } from './lost-pets.service';
import { EmailModule } from 'src/email/email.module';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([LostPet]), CacheModule.register()],
  controllers: [LostPetsController],
  providers: [LostPetsService],
  exports: [LostPetsService]
})
export class LostPetsModule {}