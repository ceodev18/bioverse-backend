import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';
import { Question } from 'src/questions/entities/question.entity';


@Entity()
export class QuestionnaireQuestion {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Questionnaire, (q) => q.questions, { onDelete: 'CASCADE' })
  questionnaire: Questionnaire;

  @ManyToOne(() => Question, (q) => q.questionnaires, { onDelete: 'CASCADE' })
  question: Question;

  @Column({ default: 0 })
  priority: number; // Determines the order of questions in the questionnaire
}
