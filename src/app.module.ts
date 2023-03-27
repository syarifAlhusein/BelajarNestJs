import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entity/cat.entity';
import { Owner } from './cats/entity/owner.entity';
import { OwnersModule } from './cats/owners.module';

@Module({
  imports: [
    CatsModule,
    OwnersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'belajar-typeorm',
      entities: [Cat, Owner],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
