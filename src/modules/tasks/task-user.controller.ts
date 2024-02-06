import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { CreteTaskUserUserCase } from "./userCases/create-task-user.usecase";
import { AuthGuard } from "src/infra/providers/auth-guard.provider";
import { CreateTaskUserSchemaDTO } from "./schemas/task-user.schema";



@Controller("/tasks")
export class TaskUserController {


    constructor(private taskUserUseCase: CreteTaskUserUserCase) {}


    @UseGuards(AuthGuard)
    @Post("/")
    async create( @Body() data: CreateTaskUserSchemaDTO, @Request() req) {
        return this.taskUserUseCase.execute({
            ...data,
            userId: req.user.sub,
        })
    }

}