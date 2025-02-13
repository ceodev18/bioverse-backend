import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { Questionnaire } from './entities/questionnaire.entity';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionnaireQuestion } from './entities/questionnaire-question.entity';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuestionnaireQuestion)
    private readonly questionnaireQuestionRepository: Repository<QuestionnaireQuestion>,
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
  ) { }

  findAll() {
    return this.questionnaireRepository.find();
  }

  findOne(id: number) {
    return this.questionnaireRepository.findOne({ where: { id } });
  }

  create(createQuestionnaireDto: CreateQuestionnaireDto) {
    const questionnaire = this.questionnaireRepository.create(createQuestionnaireDto);
    return this.questionnaireRepository.save(questionnaire);
  }

  async update(id: number, updateQuestionnaireDto: UpdateQuestionnaireDto) {
    await this.questionnaireRepository.update(id, updateQuestionnaireDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.questionnaireRepository.delete(id);
    return { message: 'Questionnaire deleted successfully' };
  }

  async getQuestionsForQuestionnaire(id: number): Promise<Question[]> {
    const questionnaireQuestions = await this.questionnaireQuestionRepository.find({
      where: { questionnaire: { id } },
      relations: ['question'],
    });

    if (!questionnaireQuestions.length) {
      throw new NotFoundException(`No questions found for questionnaire ${id}`);
    }
    return questionnaireQuestions.map(qq => qq.question);
  }

  async submitAnswers(questionnaireId: number, userId: number, answers: Record<number, string | string[]>) {
    console.log('Received:', { questionnaireId, userId, answers });

    if (!userId || !answers || typeof answers !== 'object') {
      throw new BadRequestException('Invalid request. `userId` and `answers` are required.');
    }

    const existingAnswers = await this.userAnswerRepository.findOne({
      where: {
        questionnaire: { id: questionnaireId },
        user: { id: userId.toString() }
      }
    });

    if (existingAnswers) {
      throw new BadRequestException('User has already completed this questionnaire.');
    }

    const formattedAnswers = [];

    for (const questionId in answers) {
      if (answers.hasOwnProperty(questionId)) {
        const answerValues = Array.isArray(answers[questionId]) ? answers[questionId] : [answers[questionId]];
        for (const value of answerValues) {
          formattedAnswers.push({
            userId,
            questionId: Number(questionId),
            value,
          });
        }
      }
    }

    console.log('Formatted answers:', formattedAnswers);

    for (const answer of formattedAnswers) {
      await this.userAnswerRepository.save({
        user: { id: answer.userId },
        questionnaire: { id: questionnaireId },
        question: { id: answer.questionId },
        answer: answer.value,
      });
    }

    return { message: 'Answers submitted successfully' };
  }

  async getUsersWithAnswers() {
    return this.userAnswerRepository
      .createQueryBuilder("answer")
      .leftJoin("answer.user", "user")
      .leftJoin("answer.questionnaire", "questionnaire")
      .select([
        "user.id AS id",
        "user.username AS username",
        "questionnaire.id AS questionnaireId",
        "questionnaire.title AS questionnaireTitle",
      ])
      .where("user.role = :role", { role: "user" }) // Solo usuarios normales
      .groupBy("user.id, user.username, questionnaire.id, questionnaire.title")
      .having("COUNT(answer.id) > 0") // Solo los que tienen respuestas
      .getRawMany();
  }

  async getUserAnswers(userId: number) {
    return this.userAnswerRepository
      .createQueryBuilder("answer")
      .leftJoinAndSelect("answer.question", "question")
      .leftJoinAndSelect("answer.questionnaire", "questionnaire")
      .where("answer.userId = :userId", { userId })
      .select([
        "answer.id",
        "question.text AS question",
        "answer.answer AS answer",
        "questionnaire.title AS questionnaire",
      ])
      .getRawMany();
  }

  async getUserAnswersForQuestionnaire(userId: string, questionnaireId: number) {
    return this.userAnswerRepository
      .createQueryBuilder('answer')
      .leftJoinAndSelect('answer.question', 'question')
      .leftJoinAndSelect('answer.questionnaire', 'questionnaire')
      .where('answer.userId = :userId', { userId })
      .andWhere('answer.questionnaireId = :questionnaireId', { questionnaireId })
      .select([
        'answer.id',
        'question.text AS question',
        'answer.answer AS answer',
        'questionnaire.title AS questionnaire',
      ])
      .getRawMany();
  }

  async hasUserCompleted(questionnaireId: number, userId: string): Promise<boolean> {
    const existingAnswers = await this.userAnswerRepository.findOne({
      where: {
        questionnaire: { id: questionnaireId },
        user: { id: userId }
      }
    });
    return !!existingAnswers;
  }

}
