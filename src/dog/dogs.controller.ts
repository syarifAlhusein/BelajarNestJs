import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Patch, Query } from '@nestjs/common/decorators';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './entity/dog-entity';
import { GetDogFilterDto } from './dto/get-dog-filter.dto';
import { UpdateDogStatusDto } from './dto/update-dog-status.dto';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async createCat(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    return this.dogsService.createDog(createDogDto);
  }

  @Get()
  async find(@Query() filterDto: GetDogFilterDto): Promise<Dog[]> {
    return this.dogsService.getDogs(filterDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.dogsService.delete(id);
  }

  @Patch('/:id/status')
  async updateDogStatus(
    @Param('id') id: string,
    @Body() updateDogStatusDto: UpdateDogStatusDto,
  ): Promise<Dog> {
    const { status } = updateDogStatusDto;
    return this.dogsService.updateDogStatus(id, status);
  }
}
