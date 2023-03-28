import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './entity/pet.entity';
import { GetPetFilterDto } from './dto/get-pet-filter.dto';

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Post()
  async createPet(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.createPet(createPetDto);
  }

  @Get()
  async find(@Query() filterDto: GetPetFilterDto): Promise<Pet[]> {
    return this.petsService.getPets(filterDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Pet> {
    return this.petsService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.petsService.delete(id);
  }
}
