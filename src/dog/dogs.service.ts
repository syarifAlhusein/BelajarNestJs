import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersRepository } from 'src/owners/repository/owners-repository';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entity/dog-entity';
import { DogsRepository } from './repository/dogs-repository';
import { GetDogFilterDto } from './dto/get-dog-filter.dto';
import { DogStatus } from './interfaces/dog-status.enum';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogsRepository) private dogsRepository: DogsRepository,
    @InjectRepository(OwnersRepository)
    private ownersRepository: OwnersRepository,
  ) {}

  getDogs(filterDto: GetDogFilterDto): Promise<Dog[]> {
    return this.dogsRepository.getDogs(filterDto);
  }

  async createDog(createDogDto: CreateDogDto): Promise<Dog> {
    const owner = await this.ownersRepository.getOwnerBy({
      id: createDogDto.ownerId,
    });

    if (!owner) {
      throw new NotFoundException(
        `Owner with name '${createDogDto.ownerId}' not found`,
      );
    }

    createDogDto.owner = owner;
    return this.dogsRepository.createDog(createDogDto);
  }

  async findById(id: string): Promise<Dog> {
    const found = await this.dogsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!found) {
      throw new NotFoundException(`Dog with name '${id}' not found`);
    }
    return found;
  }

  async delete(id: string): Promise<void> {
    const result = await this.dogsRepository.delete(id);
    console.log(result);
  }

  async updateDogStatus(id: string, status: DogStatus): Promise<Dog> {
    const dog = await this.findById(id);

    dog.status = status;
    await this.dogsRepository.save(dog);

    return dog;
  }
}
