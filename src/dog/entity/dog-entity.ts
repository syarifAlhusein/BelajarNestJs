/* eslint-disable prettier/prettier */
import { Owner } from 'src/owners/entity/owner.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DogStatus } from '../interfaces/dog-status.enum';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column()
  status: DogStatus;

  @ManyToOne(() => Owner, (owner) => owner.dogs)
  owner: Owner;
}
