import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>
  ){}
  async create(createRewardDto: CreateRewardDto) {
    const reward = this.rewardRepository.create(createRewardDto);
    await this.rewardRepository.save(reward);
    return reward;
  }

  async findAll() {
    let reward = await this.rewardRepository.find({});
    return reward;
  }

  async findOne(id: string) {
    const reward = await this.rewardRepository.findOneBy({id:id});
    if (!reward) {
      throw new NotFoundException(`el reward con el id: ${id} no existe`)
    }
    return reward;
  }

  async update(id: string, updateRewardDto: UpdateRewardDto) {
    const reward = await this.rewardRepository.preload({
      id:id,
      ...updateRewardDto,
    })

    if (!reward) {
      throw new NotFoundException(`el reward con el id: ${id} no existe`)
    }

    this.rewardRepository.save(reward);
    return reward;
  }

  async remove(id: string) {
    const reward = await this.rewardRepository.findOneBy({id:id});
    if (!reward) {
      throw new NotFoundException(`el reward con el id: ${id} no existe`)
    }
    this.rewardRepository.delete({id:id});
    return reward;
  }
}
