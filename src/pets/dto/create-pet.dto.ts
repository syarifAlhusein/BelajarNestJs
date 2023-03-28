import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  id: number;

  @IsNotEmpty()
  name: string;
}
