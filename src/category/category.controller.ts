import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { GetCatFilterDto } from 'src/cat/dto/get-cat-filter.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async find(@Query() filterDto: GetCatFilterDto): Promise<Category[]> {
    return this.categoryService.getCategory(filterDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoryService.delete(id);
  }
}
