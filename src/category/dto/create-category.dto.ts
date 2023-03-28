import { IsNotEmpty, IsOptional } from 'class-validator';
import { Pet } from 'src/pets/entity/pet.entity';

export class CreateCategoryDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  petId: number;

  @IsOptional()
  pet: Pet;
}
