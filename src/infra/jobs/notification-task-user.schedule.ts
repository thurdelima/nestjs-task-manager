import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ITaskUserRepository } from "src/modules/tasks/repositories/task-user.repository";




@Injectable()
export class NotificationTaskUserSchedule {

    constructor(
        private taskRepository: ITaskUserRepository
    ){}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async getAllTasksDay() {
        const allTasks = await this.taskRepository.findAllStartDay();
        console.log('Tasks OK!', allTasks);
    }

}