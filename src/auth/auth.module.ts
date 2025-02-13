import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User
        ])
    ],
    providers: [AuthService, UsersService],
    controllers: [AuthController]
})
export class AuthModule { }
