import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../entity/category.entity';
import { GetCategoryFilterDto } from '../dto/get-category-filter.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getCategory(filterDto: GetCategoryFilterDto): Promise<Category[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('category').leftJoinAndSelect(
      'category.pet',
      'cp',
    );

    if (search) {
      query.andWhere('LOWER(category.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const category = await query.getMany();
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, pet } = createCategoryDto;

    const newCategory = this.create({
      name,
      pet,
    });
    await this.dataSource.manager.save(newCategory);
    return newCategory;
  }
}
