import { Injectable } from "@nestjs/common";
import { AvatarDTO } from "../dto/user.dto";
import { IStorage } from "../../../infra/providers/storage/storage";
import { PrismaService } from "../../../infra/database/prisma.service";
import { extname } from "path";



@Injectable()
export class UploadAvatarUserUseCase {

    constructor(private storage: IStorage, private prisma: PrismaService) { }

    async execute(data: AvatarDTO) {

        const extFile = extname(data.file.originalname);
        const transformName = `${data.idUser}${extFile}`;
        data.file.originalname = transformName;
        const file = await this.storage.upload(data.file, 'avatar');


        const pathAvatarUser = `avatar/${data.file.originalname}`;

        await this.uploadAvatar(data.idUser, pathAvatarUser)
        return file;

    }

    async uploadAvatar(id: string, path: string) {
        await this.prisma.user.update({
            data: {
                avatarUrl: path,
            },
            where: {
                id,
            },
        });
    }


}