import { Module } from '@nestjs/common';
import { UserController } from './modules/users/user.controller';
import { UserModule } from './modules/users/user.module';
import { CreateUserUseCase } from './modules/users/useCases/create-user.usecase';
import { PrismaService } from './infra/database/prisma.service';
import { LoginModule } from './modules/login/login.module';
import { ProfileUserUseCase } from './modules/users/useCases/profile-user.usercase';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';



@Module({
  imports: [LoginModule, UserModule],
  controllers: [UserController],
  providers: [CreateUserUseCase,ProfileUserUseCase , PrismaService, {
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }],
})
export class AppModule {}
