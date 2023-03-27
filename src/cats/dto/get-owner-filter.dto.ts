/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { OwnerStatus } from '../interfaces/owner-status';

export class GetOwnerFilterDto {
  @IsOptional()
  @IsEnum(OwnerStatus)
  status?: OwnerStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
