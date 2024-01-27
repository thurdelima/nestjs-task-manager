import { Module } from '@nestjs/common';
import { UserController } from './modules/users/user.controller';
import { UserModule } from './modules/users/user.module';
import { CreateUserUseCase } from './modules/users/useCases/create-user.usecase';
import { PrismaService } from './infra/database/prisma.service';



@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserUseCase, PrismaService],
})
export class AppModule {}
