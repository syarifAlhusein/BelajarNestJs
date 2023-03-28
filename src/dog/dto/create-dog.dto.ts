/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Owner } from 'src/owners/entity/owner.entity';

export class CreateDogDto {
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
