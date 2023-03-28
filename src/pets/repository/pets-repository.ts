import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Pet } from '../entity/pet.entity';
import { GetPetFilterDto } from '../dto/get-pet-filter.dto';
import { CreatePetDto } from '../dto/create-pet.dto';

@Injectable()
export class PetsRepository extends Repository<Pet> {
  constructor(private dataSource: DataSource) {
    super(Pet, dataSource.createEntityManager());
  }

  async getPets(filterDto: GetPetFilterDto): Promise<Pet[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('pet');

    if (search) {
      query.andWhere(
        'LOWER(pet.name) LIKE LOWER(:search) OR LOWER(pet.breed) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const pet = await query.getMany();
    return pet;
  }

  async createPet(createPetDto: CreatePetDto): Promise<Pet> {
    const { name } = createPetDto;

    const newPet = this.create({
      name,
    });
    await this.dataSource.manager.save(newPet);
    return newPet;
  }

  async getPetBy(options: FindOptionsWhere<Pet>): Promise<Pet> {
    return await this.findOne({
      where: options,
    });
  }
}
