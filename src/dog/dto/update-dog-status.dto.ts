/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { DogStatus } from '../interfaces/dog-status.enum';


export class UpdateDogStatusDto {
  @IsEnum(DogStatus)
  status: DogStatus;
}
