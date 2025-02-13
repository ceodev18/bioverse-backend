import {
  Controller, Get, Post, Put, Delete, Param, Body, BadRequestException
} from '@nestjs/common';
import { QuestionnairesService } from './questionnaires.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) { }

  @Get()
  findAll() {
    console.log("Calling questionnaires...");
    return this.questionnairesService.findAll();
  }

  @Get('users-with-answers')
  async getUsersWithAnswers() {
    return this.questionnairesService.getUsersWithAnswers();
  }

  @Get('user/:id/answers')
  async getUserAnswers(@Param('id') userId: number) {
    return this.questionnairesService.getUserAnswers(userId);
  }

  @Get(':id(\\d+)') // Ensure only numeric IDs are accepted
  findOne(@Param('id') id: number) {
    return this.questionnairesService.findOne(id);
  }

  @Get(':id/questions')
  async getQuestions(@Param('id') id: number) {
    return this.questionnairesService.getQuestionsForQuestionnaire(id);
  }

  @Post()
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnairesService.create(createQuestionnaireDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateQuestionnaireDto: UpdateQuestionnaireDto) {
    return this.questionnairesService.update(id, updateQuestionnaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionnairesService.remove(id);
  }

  @Post(':id/submit')
  async submitAnswers(
    @Param('id') questionnaireId: number,
    @Body() { userId, answers }: { userId: number; answers: Record<number, string | string[]> }
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.questionnairesService.submitAnswers(questionnaireId, userId, answers);
  }

  @Get('user/:userId/questionnaire/:questionnaireId/answers')
  async getUserAnswersForQuestionnaire(
    @Param('userId') userId: string,
    @Param('questionnaireId') questionnaireId: number
  ) {
    return this.questionnairesService.getUserAnswersForQuestionnaire(userId, questionnaireId);
  }

  @Get(':id/user/:userId/completed')
  async hasUserCompletedQuestionnaire(
    @Param('id') questionnaireId: number,
    @Param('userId') userId: string
  ) {
    const completed = await this.questionnairesService.hasUserCompleted(questionnaireId, userId);
    return { completed };
  }
}
