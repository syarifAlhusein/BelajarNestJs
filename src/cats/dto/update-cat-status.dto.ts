/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { CatStatus } from '../interfaces/cat-status.enum';

export class UpdateCatStatusDto {
  @IsEnum(CatStatus)
  status: CatStatus;
}
