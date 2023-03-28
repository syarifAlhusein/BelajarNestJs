import { DataSource, Repository } from 'typeorm';
import { Dog } from '../entity/dog-entity';
import { CreateDogDto } from '../dto/create-dog.dto';
import { DogStatus } from '../interfaces/dog-status.enum';
import { Injectable } from '@nestjs/common';
import { GetDogFilterDto } from '../dto/get-dog-filter.dto';

@Injectable()
export class DogsRepository extends Repository<Dog> {
  constructor(private dataSource: DataSource) {
    super(Dog, dataSource.createEntityManager());
  }

  async getDogs(filterDto: GetDogFilterDto): Promise<Dog[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('dog').leftJoinAndSelect(
      'dog.owner',
      'o',
    );

    if (status) {
      query.andWhere('dog.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(dog.name) LIKE LOWER(:search) OR LOWER(dog.breed) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const dog = await query.getMany();
    return dog;
  }

  async createDog(createDogDto: CreateDogDto): Promise<Dog> {
    const { name, age, breed, owner } = createDogDto;

    const newDog = this.create({
      name,
      age,
      breed,
      status: DogStatus.LIFE,
      owner,
    });
    await this.dataSource.manager.save(newDog);
    return newDog;
  }
}
