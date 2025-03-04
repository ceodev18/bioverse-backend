import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from '../questionnaires/entities/questionnaire.entity';
import { Question } from '../questions/entities/question.entity';
import { QuestionnaireQuestion } from '../questionnaires/entities/questionnaire-question.entity';

@Injectable()
export class CsvUploadService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepo: Repository<Questionnaire>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(QuestionnaireQuestion)
    private readonly questionnaireQuestionRepo: Repository<QuestionnaireQuestion>,
  ) { }

  async processCsv(filePath: string, fileName: string): Promise<any> {
    console.log("peaking a file");
    if (fileName.includes('questionnaire_questionnaires')) {
      console.log("processing questionnaire_questionnaires");
      return this.loadQuestionnaires(filePath);
    } else if (fileName.includes('questionnaire_questions')) {
      console.log("processing questionnaire_questions");
      return this.loadQuestions(filePath);
    } else if (fileName.includes('questionnaire_junction')) {
      console.log("processing questionnaire_junction");
      return this.loadQuestionnaireJunction(filePath);
    } else {
      return { message: 'Invalid CSV file name' };
    }
  }

  private async loadCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  private async loadQuestionnaires(filePath: string) {
    const data = await this.loadCsv(filePath);
    for (const row of data) {
      console.log('Processing row:', row);

      const questionnaire = this.questionnaireRepo.create({
        id: Number(row.id), 
        title: row.title || row.name, 
        description: row.description || '',
      });

      console.log('Processed Questionnaire:', questionnaire);

      await this.questionnaireRepo.save(questionnaire);
    }
    fs.unlinkSync(filePath);
    return { message: 'Questionnaires CSV processed successfully' };
  }


  private async loadQuestions(filePath: string) {
    const data = await this.loadCsv(filePath);
    for (const row of data) {
      let parsedData;
      try {
        parsedData = JSON.parse(row.question); 
      } catch (error) {
        console.error('Failed to parse question field as JSON:', row.question);
        continue; 
      }

      const question = this.questionRepo.create({
        id: Number(row.id), 
        text: parsedData.question, 
        type: parsedData.type, 
        options: parsedData.options || [], 
      });

      console.log('Processed Question:', question);

      await this.questionRepo.save(question);
    }
    fs.unlinkSync(filePath);
    return { message: 'Questions CSV processed successfully' };
  }


  private async loadQuestionnaireJunction(filePath: string) {
    const data = await this.loadCsv(filePath);
    
    for (const row of data) {
      const questionnaireId = Number(row.questionnaire_id);
      const questionId = Number(row.question_id);

      
      const questionnaireExists = await this.questionnaireRepo.findOne({ where: { id: questionnaireId } });
      if (!questionnaireExists) {
        console.warn(`Questionnaire ID ${questionnaireId} not found. Skipping row.`);
        continue;
      }

      
      const questionExists = await this.questionRepo.findOne({ where: { id: questionId } });
      if (!questionExists) {
        console.warn(`Question ID ${questionId} not found. Skipping row.`);
        continue;
      }

      const junction = this.questionnaireQuestionRepo.create({
        id: Number(row.id),
        questionnaire: { id: questionnaireId },
        question: { id: questionId },
        priority: Number(row.priority) || 0, 
      });

      console.log('Saving junction:', junction);
      await this.questionnaireQuestionRepo.save(junction);
    }

    fs.unlinkSync(filePath);
    return { message: 'Junction CSV processed successfully' };
}

}
