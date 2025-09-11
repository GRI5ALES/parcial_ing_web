import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Victim } from './entities/victim.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VictimService {
  constructor(
    @InjectRepository(Victim)
    private readonly victimRepository:Repository<Victim>
  ){}
  async create(createVictimDto: CreateVictimDto) {
    const victim = this.victimRepository.create(createVictimDto);
    await this.victimRepository.save(victim);
    return victim;
  }

  async findAll() {
    const victim = await this.victimRepository.find({});
    return victim;
  }

  async findOne(id: string) {
    const victim = await this.victimRepository.findOneBy({id: id});
    if (!victim){
      throw new NotFoundException(`la victima con el id: ${id} no existe`);
    }
    return victim;
  }

  async update(id: string, updateVictimDto: UpdateVictimDto) {
    const victim = await this.victimRepository.preload(
      {id:id, ...updateVictimDto}
    )

    if(!victim){
      throw new NotFoundException(`la victima con el id: ${id} no existe`)
    }
    this.victimRepository.save(victim);
    return victim;
  }

  async remove(id: string) {
    const victim = await this.victimRepository.findOneBy({id: id});
    if (!victim){
      throw new NotFoundException(`la victima con el id: ${id} no existe`);
    }
    this.victimRepository.delete({id:id});
    return victim;
  }
}
