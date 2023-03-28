import { IsOptional, IsString } from 'class-validator';

export class GetCategoryFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
