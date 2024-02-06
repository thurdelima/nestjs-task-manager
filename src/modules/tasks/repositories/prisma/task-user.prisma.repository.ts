import { PrismaService } from "src/infra/database/prisma.service";
import { ITaskUserRepository } from "../task-user.repository";
import { TaskUserRequestDTO, TaskUserResponseDTO } from "../../dto/task-user.dto";
import { Injectable } from "@nestjs/common";




@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {

    constructor(private prisma: PrismaService) {}

    async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
       
        return this.prisma.taskUser.create({
            data: {
                task: {
                    create: {
                        description: data.description,
                        endAt: data.endAt,
                        startAt: data.startAt,
                        title: data.title,
                        priority: data.priority,
                        status: data.status
                    }
                },
                user: {
                    connect: {
                        id: data.userId
                    }
                }
            }
        })
    }
}