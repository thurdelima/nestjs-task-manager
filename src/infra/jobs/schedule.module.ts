import { Module } from "@nestjs/common";
import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";
import { ScheduleModule } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/modules/tasks/repositories/task-user.repository";
import { TaskUserPrismaRepository } from "src/modules/tasks/repositories/prisma/task-user.prisma.repository";
import { PrismaService } from "../database/prisma.service";
import { ClientsModule, Transport } from "@nestjs/microservices";





@Module({
    imports: [ScheduleModule.forRoot(),  ClientsModule.register([
        {
            name: 'NOTIFICATION',
            transport: Transport.TCP,
            options: {port: 30002, host: '127.0.0.1'},
        }
    ])],
    providers: [NotificationTaskUserSchedule, 
        {
            provide: ITaskUserRepository,
            useClass: TaskUserPrismaRepository
        }
    ]
})

export class ScheduleTaskModule {}