import { Module } from '@nestjs/common/decorators';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsRepository } from './repository/cats-repository';
import { Cat } from './entity/cat.entity';
import { OwnersRepository } from 'src/owners/repository/owners-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository, OwnersRepository],
  exports: [CatsService],
})
export class CatsModule {}
