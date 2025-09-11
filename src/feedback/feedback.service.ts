import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository:Repository<Feedback>
  ){}
  async create(createFeedbackDto: CreateFeedbackDto) {
    const feedback = this.feedbackRepository.create(createFeedbackDto);
    await this.feedbackRepository.save(feedback);
    return feedback;
  }

  async findAll() {
    let feedback = await this.feedbackRepository.find({});
    return feedback;
  }

  async findOne(id: string) {
    const feedback = await this.feedbackRepository.findOneBy({id: id});
    if(!feedback){
      throw new NotFoundException(`el feedback con el id: ${id} no existe`)
    }
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepository.preload({
      id:id,
      ...updateFeedbackDto
    })
    if(!feedback){
      throw new NotFoundException(`el feedback con el id: ${id} no existe`)
    }
    this.feedbackRepository.save(feedback);
    return feedback;
  }

  async remove(id: string) {
    const feedback = await this.feedbackRepository.findOneBy({id: id});
    if(!feedback){
      throw new NotFoundException(`el feedback con el id: ${id} no existe`)
    }
    this.feedbackRepository.delete({id:id});
    return feedback;
  }
}
