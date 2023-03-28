import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { CategoryRepository } from './repository/category-repository';
import { GetCategoryFilterDto } from './dto/get-category-filter.dto';
import { PetsRepository } from 'src/pets/repository/pets-repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(PetsRepository) private petsRepository: PetsRepository,
  ) {}

  getCategory(filterDto: GetCategoryFilterDto): Promise<Category[]> {
    return this.categoryRepository.getCategory(filterDto);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    console.log('dto', createCategoryDto);

    const pet =
      createCategoryDto?.petId &&
      (await this.petsRepository.getPetBy({ id: createCategoryDto.petId }));

    if (createCategoryDto?.petId && !pet) {
      throw new NotFoundException(
        `Pet with name '${createCategoryDto.petId}' not found`,
      );
    }

    createCategoryDto.pet = pet;
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async findById(id: number): Promise<Category> {
    const found = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Category with name '${id}' not found`);
    }
    return found;
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    console.log(result);
  }
}
