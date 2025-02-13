import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Questionnaire } from '../../questionnaires/entities/questionnaire.entity';
import { Question } from '../../questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';


@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Questionnaire, (q) => q.userAnswers, { onDelete: 'CASCADE' })
  questionnaire: Questionnaire;

  @ManyToOne(() => Question, (q) => q.userAnswers, { onDelete: 'CASCADE' })
  question: Question;

  @Column('text', { nullable: false })
  answer: string;
}
