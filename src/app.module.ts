import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { UserAnswersModule } from './user-answers/user-answers.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CsvUploadModule } from './csv-upload/csv-upload.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    QuestionnairesModule, QuestionsModule, UsersModule, UserAnswersModule, CsvUploadModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
