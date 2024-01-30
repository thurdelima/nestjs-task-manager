import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { PrismaService } from "src/infra/database/prisma.service";
import { SignInUseCase } from "./useCases/sign-in.usecase";
import { JwtModule } from "@nestjs/jwt";



@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'fdsf0239r32f0j283uf828r20fjfuiwe',
            signOptions: {expiresIn: '60s'}
        })
    ],
    controllers: [LoginController],
    providers: [PrismaService, SignInUseCase]
})
export class LoginModule{}