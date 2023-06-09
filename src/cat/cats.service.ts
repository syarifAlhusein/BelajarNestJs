import { Injectable, NotFoundException } from '@nestjs/common';
import { CatStatus } from './interface/cat-status.enum';
import { GetCatFilterDto } from './dto/get-cat-filter.dto';
import { CatsRepository } from './repository/cats-repository';
import { Cat } from './entity/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnersRepository } from 'src/owners/repository/owners-repository';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsRepository) private catsRepository: CatsRepository,
    @InjectRepository(OwnersRepository)
    private ownersRepository: OwnersRepository,
  ) {}

  getCats(filterDto: GetCatFilterDto): Promise<Cat[]> {
    return this.catsRepository.getCats(filterDto);
  }

  async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    const owner = await this.ownersRepository.getOwnerBy({
      id: createCatDto.ownerId,
    });

    if (!owner) {
      throw new NotFoundException(
        `Owner with name '${createCatDto.ownerId}' not found`,
      );
    }

    createCatDto.owner = owner;
    return this.catsRepository.createCat(createCatDto);
  }

  async findById(id: string): Promise<Cat> {
    const found = await this.catsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!found) {
      throw new NotFoundException(`Cat with name '${id}' not found`);
    }
    return found;
  }

  async delete(id: string): Promise<void> {
    const result = await this.catsRepository.delete(id);
    console.log(result);
  }

  async updateCatStatus(id: string, status: CatStatus): Promise<Cat> {
    const cat = await this.findById(id);

    cat.status = status;
    await this.catsRepository.save(cat);

    return cat;
  }
}
