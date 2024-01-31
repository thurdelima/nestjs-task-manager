import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { ProfileUserUseCase } from "./useCases/profile-user.usercase";
import { PrismaService } from "src/infra/database/prisma.service";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [CreateUserUseCase, ProfileUserUseCase, PrismaService]
})
export class UserModule {


}