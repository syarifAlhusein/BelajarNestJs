/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { CatStatus } from '../interface/cat-status.enum';

export class GetCatFilterDto {
  @IsOptional()
  @IsEnum(CatStatus)
  status?: CatStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
