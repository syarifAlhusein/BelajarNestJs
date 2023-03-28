/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { CatStatus } from '../interface/cat-status.enum';

export class UpdateCatStatusDto {
  @IsEnum(CatStatus)
  status: CatStatus;
}
