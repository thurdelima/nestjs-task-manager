import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { CreateUserDTO } from "./dto/user.dto";
import { CreateUserValidationPipe } from "./pipe/create-user.validation.pipe";
import { AuthGuard } from "src/infra/providers/auth-guard.provider";
import { ProfileUserUseCase } from "./useCases/profile-user.usercase";
import { CreateUserResponseSchemaDTO, CreateUserSchemaDTO } from "./schemas/create-user.schema";





@Controller('/users')
export class UserController {

    constructor(private readonly createUserUseCase: CreateUserUseCase, private readonly profileUserUseCase: ProfileUserUseCase) { }

    @Post()
    //@UsePipes(new CreateUserValidationPipe())
    async create(@Body() data: CreateUserSchemaDTO) {

        const user = await this.createUserUseCase.execute(data);

        return CreateUserResponseSchemaDTO.parse(user);
    }

    @Get("/profile")
    @UseGuards(AuthGuard)
    async profile(@Request() req) {

      return await this.profileUserUseCase.execute(req.user.sub);

    }

}