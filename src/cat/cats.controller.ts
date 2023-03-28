import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Patch, Query } from '@nestjs/common/decorators';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { GetCatFilterDto } from './dto/get-cat-filter.dto';
import { UpdateCatStatusDto } from './dto/update-cat-status.dto';
import { Cat } from './entity/cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    // const owner = await this.catsService.findById(createCatDto.ownerId)
    return this.catsService.createCat(createCatDto);
  }

  @Get()
  async find(@Query() filterDto: GetCatFilterDto): Promise<Cat[]> {
    return this.catsService.getCats(filterDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.catsService.delete(id);
  }

  @Patch('/:id/status')
  async updateCatStatus(
    @Param('id') id: string,
    @Body() updateCatStatusDto: UpdateCatStatusDto,
  ): Promise<Cat> {
    const { status } = updateCatStatusDto;
    return this.catsService.updateCatStatus(id, status);
  }
}
