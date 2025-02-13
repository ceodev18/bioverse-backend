import { Module } from '@nestjs/common';
import { QuestionnairesController } from './questionnaires.controller';
import { QuestionnairesService } from './questionnaires.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionnaireQuestion } from './entities/questionnaire-question.entity';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire,
      Question,
      QuestionnaireQuestion,
      UserAnswer,
      User,
    ]),
  ],
  controllers: [QuestionnairesController],
  providers: [QuestionnairesService]
})
export class QuestionnairesModule {}
