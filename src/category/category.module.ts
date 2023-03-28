import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsRepository } from 'src/pets/repository/pets-repository';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CategoryRepository } from './repository/category-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, PetsRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
