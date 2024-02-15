import { Injectable } from "@nestjs/common";
import { AvatarDTO } from "../dto/user.dto";
import { IStorage } from "src/infra/providers/storage/storage";
import { PrismaService } from "src/infra/database/prisma.service";



@Injectable()
export class UploadAvatarUserUseCase {

    constructor(private storage: IStorage, prisma: PrismaService) {}

    async execute(data: AvatarDTO) {

        const file = await this.storage.upload(data.file, 'avatar');
        console.log(file)
        return file;

    }
}