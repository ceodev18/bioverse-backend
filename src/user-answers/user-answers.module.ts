import { Module } from '@nestjs/common';
import { UserAnswersService } from './user-answers.service';
import { UserAnswersController } from './user-answers.controller';
import { UserAnswer } from './entities/user-answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        UserAnswer
      ])
    ],
  providers: [UserAnswersService],
  controllers: [UserAnswersController]
})
export class UserAnswersModule {}
