/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Cat } from 'src/cat/entity/cat.entity';

export class CreateOwnerDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsOptional()
  cat: Cat;
}
