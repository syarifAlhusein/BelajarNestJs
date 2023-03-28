/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Cat } from '../entity/cat.entity';
import { OwnerStatus } from '../interfaces/owner-status';

export class CreateOwnerDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsOptional()
  cat: Cat;
}
