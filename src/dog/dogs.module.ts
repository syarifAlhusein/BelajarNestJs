import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsRepository } from './repository/dogs-repository';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Dog } from './entity/dog-entity';
import { OwnersRepository } from 'src/owners/repository/owners-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  controllers: [DogsController],
  providers: [DogsService, DogsRepository, OwnersRepository],
  exports: [DogsService],
})
export class DogsModule {}
