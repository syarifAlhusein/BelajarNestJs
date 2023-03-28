import { IsOptional, IsString } from 'class-validator';

export class GetPetFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}
