import { Module } from '@nestjs/common';
import { UserController } from './modules/users/user.controller';
import { UserModule } from './modules/users/user.module';
import { CreateUserUseCase } from './modules/users/useCases/create-user.usecase';
import { PrismaService } from './infra/database/prisma.service';
import { LoginModule } from './modules/login/login.module';
import { ProfileUserUseCase } from './modules/users/useCases/profile-user.usercase';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { TaskUserModule } from './modules/tasks/task-user.module';
import { NotificationModule } from './modules/notification/notification.module';



@Module({
  imports: [LoginModule, UserModule, TaskUserModule, NotificationModule],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }],
})
export class AppModule {}
