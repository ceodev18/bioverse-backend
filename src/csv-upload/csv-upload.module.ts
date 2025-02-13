import { Module } from '@nestjs/common';
import { CsvUploadController } from './csv-upload.controller';
import { CsvUploadService } from './csv-upload.service';
import { Questionnaire } from 'src/questionnaires/entities/questionnaire.entity';
import { QuestionnaireQuestion } from 'src/questionnaires/entities/questionnaire-question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        Question,
        Questionnaire,
        QuestionnaireQuestion
      ])
    ],
  controllers: [CsvUploadController],
  providers: [CsvUploadService]
})
export class CsvUploadModule {}
