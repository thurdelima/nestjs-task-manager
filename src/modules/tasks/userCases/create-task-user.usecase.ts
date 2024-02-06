import { Injectable, Logger } from "@nestjs/common";
import { TaskUserRequestDTO } from "../dto/task-user.dto";
import { ITaskUserRepository } from "../repositories/task-user.repository";





@Injectable()
export class CreteTaskUserUserCase {

    private readonly logger = new Logger(CreteTaskUserUserCase.name);

    constructor(private taskUserRepository: ITaskUserRepository) { }

    async execute(data: TaskUserRequestDTO) {
        this.logger.log(`... Creating task ...`, { ...data })
        return this.taskUserRepository.save(data)
    }

}