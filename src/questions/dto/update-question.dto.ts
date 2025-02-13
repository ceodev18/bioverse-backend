export class UpdateQuestionDto {
    text?: string;
    type?: 'text' | 'multiple-choice' | 'checkbox';
    options?: string[];
  }
  