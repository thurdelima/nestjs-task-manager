import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import {hash} from "bcrypt"
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateUserDTO } from "../dto/user.dto";




@Injectable()
export class CreateUserUseCase {
    private readonly logger = new Logger(CreateUserUseCase.name);

    constructor(private prisma: PrismaService) {

    }

    async execute (data: CreateUserDTO) {

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{username: data.username}, {email: data.email}]
            }
        })


        if(user) {
            this.logger.error(`User ${data.username} already exists...`, data);
            throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
        }

        const passwordHashed = await hash(data.password, 10);

        return await this.prisma.user.create({
            data: {
                ...data,
                password: passwordHashed
            }   
        })
    }
}