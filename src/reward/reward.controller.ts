import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UserRole } from 'src/common/enums/roles.enum';

@Controller('reward')
@UseGuards( JwtAuthGuard, RolesGuard,)
@Roles(UserRole.ADMIN)
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  create(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.create(createRewardDto);
  }

  @Get()
  findAll() {
    return this.rewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRewardDto: UpdateRewardDto) {
    return this.rewardService.update(id, updateRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rewardService.remove(id);
  }
}
