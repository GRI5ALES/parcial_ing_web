import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reward, User]),
    UserModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
