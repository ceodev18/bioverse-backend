export class CreateQuestionDto {
    text: string;
    type: 'text' | 'multiple-choice' | 'checkbox';
    options?: string[]; // Solo para preguntas de selección
  }
  