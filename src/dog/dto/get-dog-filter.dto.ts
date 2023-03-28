/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { DogStatus } from '../interfaces/dog-status.enum';

export class GetDogFilterDto {
  @IsOptional()
  @IsEnum(DogStatus)
  status?: DogStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
