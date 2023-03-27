/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { OwnerStatus } from '../interfaces/owner-status';


export class UpdateOwnerStatusDto {
  @IsEnum(OwnerStatus)
  status: OwnerStatus;
}
