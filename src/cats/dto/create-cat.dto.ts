/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Owner } from '../entity/owner.entity';

export class CreateCatDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  ownerId: string;

  @IsOptional()
  owner: Owner;
}