import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from 'src/cat/entity/cat.entity';
import { Owner } from './entity/owner.entity';
import { OwnerController } from './owner.controller';
import { OwnersService } from './owners.service';
import { CatsRepository } from 'src/cat/repository/cats-repository';
import { OwnersRepository } from './repository/owners-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Cat])],
  controllers: [OwnerController],
  providers: [OwnersService, OwnersRepository, CatsRepository],
  exports: [OwnersService],
})
export class OwnersModule {}
