import { Module } from "@nestjs/common";
import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";
import { ScheduleModule } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/modules/tasks/repositories/task-user.repository";
import { TaskUserPrismaRepository } from "src/modules/tasks/repositories/prisma/task-user.prisma.repository";
import { PrismaService } from "../database/prisma.service";





@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [NotificationTaskUserSchedule, 
        {
            provide: ITaskUserRepository,
            useClass: TaskUserPrismaRepository
        }
    ]
})

export class ScheduleTaskModule {}