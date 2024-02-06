import { Module } from "@nestjs/common";
import { TaskUserController } from "./task-user.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreteTaskUserUserCase } from "./userCases/create-task-user.usecase";
import { ITaskUserRepository } from "./repositories/task-user.repository";
import { TaskUserPrismaRepository } from "./repositories/prisma/task-user.prisma.repository";





@Module({
    controllers: [TaskUserController],
    providers: [
        PrismaService,
        CreteTaskUserUserCase,
        {
            provide: ITaskUserRepository,
            useClass: TaskUserPrismaRepository
        }
    ]
})
export class TaskUserModule {}