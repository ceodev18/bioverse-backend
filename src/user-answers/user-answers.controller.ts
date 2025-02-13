import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { CreateUserAnswerDto } from './dto/create-user-answer.dto';


@Controller('user-answers')
export class UserAnswersController {
  constructor(private readonly userAnswersService: UserAnswersService) {}

  @Get()
  findAll() {
    return this.userAnswersService.findAll();
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.userAnswersService.findByUser(userId);
  }

  @Get(':userId/:questionnaireId')
  findByUserAndQuestionnaire(@Param('userId') userId: string, @Param('questionnaireId') questionnaireId: number) {
    return this.userAnswersService.findByUserAndQuestionnaire(userId, questionnaireId);
  }

  @Post()
  create(@Body() createUserAnswerDto: CreateUserAnswerDto) {
    return this.userAnswersService.create(createUserAnswerDto);
  }
}
