/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CatStatus } from '../interfaces/cat-status.enum';
import { Owner } from './owner.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column()
  status: CatStatus;

  @ManyToOne(() => Owner, (owner) => owner.cats)
  owner: Owner;
}
