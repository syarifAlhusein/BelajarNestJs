/* eslint-disable prettier/prettier */
import { Owner } from 'src/owners/entity/owner.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CatStatus } from '../interface/cat-status.enum';


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
