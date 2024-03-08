import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/modules/tasks/repositories/task-user.repository";


type MessageDTO = {
    email: string;
    startAt: Date;
    endAt: Date;
    name: string;
    title: string;
    description: string;
};


@Injectable()
export class NotificationTaskUserSchedule {

    constructor(
        private taskRepository: ITaskUserRepository,
        @Inject('NOTIFICATION') private readonly notificationClient: ClientKafka
    ) { }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async getAllTasksDay() {
        const allTasks = await this.taskRepository.findAllStartDay();

        if (allTasks) {
            allTasks.forEach((task) => {
                const message: MessageDTO = {
                    name: task.user.name,
                    description: task.task.description,
                    title: task.task.title,
                    email: task.user.email,
                    endAt: task.task.endAt,
                    startAt: task.task.startAt,
                };
                console.log(`=== SEND NOTIFICATION ==== `);
                this.notificationClient.emit('tp_task_manager', message);
            })
        }
    }

}