import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswersController } from './user-answers.controller';

describe('UserAnswersController', () => {
  let controller: UserAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAnswersController],
    }).compile();

    controller = module.get<UserAnswersController>(UserAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
