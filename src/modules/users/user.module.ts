import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { CreateUserUseCase } from "./useCases/create-user.usecase";
import { ProfileUserUseCase } from "./useCases/profile-user.usercase";
import { PrismaService } from "src/infra/database/prisma.service";
import { UploadAvatarUserUseCase } from "./useCases/upload-avatar-user.usecase";
import { IStorage } from "src/infra/providers/storage/storage";
import { SupabaseStorage } from "src/infra/providers/storage/storage.supabase";


@Module({
    imports: [],
    controllers: [UserController],
    providers: [CreateUserUseCase, ProfileUserUseCase, UploadAvatarUserUseCase, PrismaService,
        {
            provide: IStorage,
            useClass: SupabaseStorage,
        }]
})
export class UserModule {


}