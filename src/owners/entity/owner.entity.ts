/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OwnerStatus } from '../interfaces/owner-status';
import { Cat } from 'src/cat/entity/cat.entity';
import { Dog } from 'src/dog/entity/dog-entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  status: OwnerStatus;

  @OneToMany(() => Cat, (cat) => cat.owner)
  @JoinColumn()
  cats: Cat[];

  @OneToMany(() => Dog, (dog) => dog.owner)
  @JoinColumn()
  dogs: Dog[];
}
