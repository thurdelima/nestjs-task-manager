import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infra/database/prisma.service";






@Injectable()
export class ProfileUserUseCase {

    constructor(private prisma: PrismaService){}

    async execute(id: string) {
        return await this.prisma.user.findUnique({
            where: {id}
        })
    }
}