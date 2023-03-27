/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { GetOwnerFilterDto } from '../dto/get-owner-filter.dto';
import { Owner } from '../entity/owner.entity';
import { OwnerStatus } from '../interfaces/owner-status';

@Injectable()
export class OwnersRepository extends Repository<Owner> {
  constructor(private dataSource: DataSource) {
    super(Owner, dataSource.createEntityManager());
  }

  async getOwners(filterDto: GetOwnerFilterDto): Promise<Owner[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('owner');

    if (status) {
      query.andWhere('owner.status = :status', { status });
    }

    if (search) {
      query.andWhere('LOWER(owner.name) LIKE LOWER(:search)');
    }

    const owner = await query.getMany();
    return owner;
  }

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const { name, age } = createOwnerDto;

    const owner = this.create({
      name,
      age,
      status: OwnerStatus.LIFE,
    });

    await this.save(owner);
    return owner;
  }

  async getOwnerBy(options: FindOptionsWhere<Owner>): Promise<Owner> {
    return await this.findOne({
      where: options,
    });
  }
}
