import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { QuestionnaireQuestion } from './questionnaire-question.entity';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';


@Entity()
export class Questionnaire {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => QuestionnaireQuestion, (q) => q.questionnaire)
  questions: QuestionnaireQuestion[];

  @OneToMany(() => UserAnswer, (ua) => ua.questionnaire)
  userAnswers: UserAnswer[];
}
