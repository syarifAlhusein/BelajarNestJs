import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Patch, Query } from '@nestjs/common/decorators';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './entity/owner.entity';
import { OwnersService } from './owners.service';
import { GetOwnerFilterDto } from './dto/get-owner-filter.dto';
import { UpdateOwnerStatusDto } from './dto/update-owner-status.dto';

@Controller('owners')
export class OwnerController {
  constructor(private ownersService: OwnersService) {}

  @Post()
  async createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownersService.createOwner(createOwnerDto);
  }

  @Get()
  async find(@Query() filterDto: GetOwnerFilterDto): Promise<Owner[]> {
    return this.ownersService.getOwners(filterDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Owner> {
    return this.ownersService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.ownersService.delete(id);
  }

  @Patch('/:id/status')
  async updateCatStatus(
    @Param('id') id: string,
    @Body() updateOwnerStatusDto: UpdateOwnerStatusDto,
  ): Promise<Owner> {
    const { status } = updateOwnerStatusDto;
    return this.ownersService.updateOwnerStatus(id, status);
  }
}
