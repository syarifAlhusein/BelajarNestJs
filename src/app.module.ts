import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cat/cats.module';
import { Cat } from './cat/entity/cat.entity';
import { Owner } from './owners/entity/owner.entity';
import { OwnersModule } from './owners/owners.module';
import { DogsModule } from './dog/dogs.module';
import { PetsModule } from './pets/pets.module';
import { CategoryModule } from './category/category.module';
import { Pet } from './pets/entity/pet.entity';
import { Category } from './category/entity/category.entity';
import { Dog } from './dog/entity/dog-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'belajar-typeorm',
      entities: [Cat, Owner, Pet, Category, Dog],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    PetsModule,
    DogsModule,
    CatsModule,
    OwnersModule,
  ],
})
export class AppModule {}
