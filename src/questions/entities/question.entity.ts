import { QuestionnaireQuestion } from 'src/questionnaires/entities/questionnaire-question.entity';
import { UserAnswer } from 'src/user-answers/entities/user-answer.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Question {
  @PrimaryColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: ['mcq', 'input'], enumName: 'question_type_enum' })
  type: 'mcq' | 'input';

  @Column('simple-array', { nullable: true })
  options?: string[];

  @OneToMany(() => QuestionnaireQuestion, (qq) => qq.question)
  questionnaires: QuestionnaireQuestion[];

  @OneToMany(() => UserAnswer, (ua) => ua.question)
  userAnswers: UserAnswer[];
}
