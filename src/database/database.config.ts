import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../users/entities/user.entity';
import { Questionnaire } from '../questionnaires/entities/questionnaire.entity';
import { Question } from '../questions/entities/question.entity';
import { UserAnswer } from '../user-answers/entities/user-answer.entity';
import { QuestionnaireQuestion } from '../questionnaires/entities/questionnaire-question.entity';

const commonConfig = {
  type: 'postgres' as const,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [User, Questionnaire, Question, UserAnswer, QuestionnaireQuestion],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
  ssl: {rejectUnauthorized: false},
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  autoLoadEntities: true,
};

export const dataSourceOptions: PostgresConnectionOptions = {
  ...commonConfig,
};

export const AppDataSource = new DataSource(dataSourceOptions);
