import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VictimService } from './victim.service';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';

@Controller('victim')
export class VictimController {
  constructor(private readonly victimService: VictimService) {}

  @Post()
  create(@Body() createVictimDto: CreateVictimDto) {
    return this.victimService.create(createVictimDto);
  }

  @Get()
  findAll() {
    return this.victimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.victimService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVictimDto: UpdateVictimDto) {
    return this.victimService.update(id, updateVictimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.victimService.remove(id);
  }
}
