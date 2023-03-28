import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entity/pet.entity';
import { PetsRepository } from './repository/pets-repository';
import { GetPetFilterDto } from './dto/get-pet-filter.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetsRepository) private petsRepository: PetsRepository,
  ) {}

  getPets(filterDto: GetPetFilterDto): Promise<Pet[]> {
    return this.petsRepository.getPets(filterDto);
  }

  async createPet(createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsRepository.createPet(createPetDto);
  }

  async findById(id: number): Promise<Pet> {
    const found = await this.petsRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Pet with name '${id}' not found`);
    }
    return found;
  }

  async delete(id: number): Promise<void> {
    const result = await this.petsRepository.delete(id);
    console.log(result);
  }
}
