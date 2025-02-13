import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';
import { UserAnswer } from './entities/user-answer.entity';


@Injectable()
export class UserAnswersService {
  constructor(
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
  ) {}

  findAll() {
    return this.userAnswerRepository.find({ relations: ['user', 'questionnaire', 'question'] });
  }

  findByUser(userId: string) {
    return this.userAnswerRepository.find({ where: { user: { id: userId } }, relations: ['questionnaire', 'question'] });
  }

  findByUserAndQuestionnaire(userId: string, questionnaireId: number) {
    return this.userAnswerRepository.find({
      where: { user: { id: userId }, questionnaire: { id: questionnaireId } },
      relations: ['question', 'questionnaire'],
    });
  }

  async create(createUserAnswerDto: CreateUserAnswerDto) {
    // const userAnswer = this.userAnswerRepository.create(createUserAnswerDto);
    // return this.userAnswerRepository.save(userAnswer);
  }
}
