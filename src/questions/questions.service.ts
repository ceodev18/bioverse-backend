import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';


@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  findAll() {
    return this.questionRepository.find();
  }

  findOne(id: number) {
    return this.questionRepository.findOne({ where: { id } });
  }

  create(createQuestionDto: CreateQuestionDto) {
    // const question = this.questionRepository.create(createQuestionDto);
    // return this.questionRepository.save(question);
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    // await this.questionRepository.update(id, updateQuestionDto);
    // return this.findOne(id);
  }

  async remove(id: string) {
    await this.questionRepository.delete(id);
    return { message: 'Question deleted successfully' };
  }
}
