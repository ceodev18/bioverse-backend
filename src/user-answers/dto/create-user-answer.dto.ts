export class CreateUserAnswerDto {
    userId: string;
    questionnaireId: string;
    questionId: string;
    answer: string | string[];
  }
  