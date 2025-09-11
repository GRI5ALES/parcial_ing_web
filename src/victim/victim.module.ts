import { Module } from '@nestjs/common';
import { VictimService } from './victim.service';
import { VictimController } from './victim.controller';
import { Victim } from './entities/victim.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Victim])],
  controllers: [VictimController],
  providers: [VictimService],
})
export class VictimModule {}
