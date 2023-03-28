import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entity/pet.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PetsRepository } from './repository/pets-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
  exports: [PetsService],
})
export class PetsModule {}
