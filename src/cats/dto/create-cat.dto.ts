/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateCatDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  breed: string;
}