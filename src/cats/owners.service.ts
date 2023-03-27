/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { OwnersRepository } from './repository/owners-repository';
import { Owner } from './entity/owner.entity';
import { GetOwnerFilterDto } from './dto/get-owner-filter.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { OwnerStatus } from './interfaces/owner-status';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(OwnersRepository)
    private ownersRepository: OwnersRepository,
  ) {}

  getOwners(filterDto: GetOwnerFilterDto): Promise<Owner[]> {
    return this.ownersRepository.getOwners(filterDto);
  }

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownersRepository.createOwner(createOwnerDto);
  }

  async findById(id: string): Promise<Owner> {
    const found = await this.ownersRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Owner with name '${id}' not found`);
    }
    return found;
  }

  async delete(id: string): Promise<void> {
    const result = await this.ownersRepository.delete(id);
    console.log(result);
  }

  async updateOwnerStatus(id: string, status: OwnerStatus): Promise<Owner> {
    const owner = await this.findById(id);

    owner.status = status;
    await this.ownersRepository.save(owner);

    return owner;
  }
}
