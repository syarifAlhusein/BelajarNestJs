/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { OwnerStatus } from '../interfaces/owner-status';

export class CreateOwnerDto {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  catId: string;
}
