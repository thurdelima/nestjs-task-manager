import { Body, Controller, Get, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { CreateUserDTO, FileDTO } from "./dto/user.dto";
import { CreateUserValidationPipe } from "./pipe/create-user.validation.pipe";
import { AuthGuard } from "../../infra/providers/auth-guard.provider";
import { ProfileUserUseCase } from "./useCases/profile-user.usercase";
import { CreateUserResponseSchemaDTO, CreateUserSchema, CreateUserSchemaDTO } from "./schemas/create-user.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadAvatarUserUseCase } from "./useCases/upload-avatar-user.usecase";
import { zodToOpenAPI } from "nestjs-zod";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema)




@Controller('/users')
@ApiTags('users')
export class UserController {

  constructor(private readonly createUserUseCase: CreateUserUseCase, private readonly profileUserUseCase: ProfileUserUseCase, private readonly uploadAvatarUserUserCase: UploadAvatarUserUseCase) { }

  @Post()
  @ApiBody({
    description: "Criação de usuário",
    schema: schemaUserSwagger
  })
  @ApiResponse({status: 201, description: "Usuário cadastrado com sucesso"})
  @ApiResponse({status: 400, description: "User already exists"})
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


  @Put("/avatar")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {

    const result = await this.uploadAvatarUserUserCase.execute({
      file,
      idUser: req.user.sub
    });

    return result;
  }

}