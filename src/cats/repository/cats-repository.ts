/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Cat } from '../entity/cat.entity';
import { CreateCatDto } from '../dto/create-cat.dto';
import { CatStatus } from '../interfaces/cat-status.enum';
import { Injectable } from '@nestjs/common';
import { GetCatFilterDto } from '../dto/get-cat-filter.dto';
import { Owner } from '../entity/owner.entity';

@Injectable()
export class CatsRepository extends Repository<Cat> {
  constructor(private dataSource: DataSource) {
    super(Cat, dataSource.createEntityManager());
  }

  async getCats(filterDto: GetCatFilterDto): Promise<Cat[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('cat').leftJoinAndSelect(
      'cat.owner',
      'o',
    );

    if (status) {
      query.andWhere('cat.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(cat.name) LIKE LOWER(:search) OR LOWER(cat.breed) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const cat = await query.getMany();
    return cat;
  }

  async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    const { name, age, breed, owner } = createCatDto;

    const newCat = this.create({
      name,
      age,
      breed,
      status: CatStatus.LIFE,
      owner,
    });
    await this.dataSource.manager.save(newCat);
    return newCat;
  }
}
