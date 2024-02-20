import { Test } from "@nestjs/testing"
import { UserController } from "../user.controller"
import { CreateUserUseCase } from "../useCases/create-user.usecase";
import { ProfileUserUseCase } from "../useCases/profile-user.usercase";
import { UploadAvatarUserUseCase } from "../useCases/upload-avatar-user.usecase";
import { CreateUserResponseDTO, CreateUserSchemaDTO } from "../schemas/create-user.schema";
import { CreateUserDTO } from "../dto/user.dto";



describe("UserController test suite", () => {

    let userController: UserController;

    let createUserUseCaseMock: jest.Mocked<CreateUserUseCase>;
    let profileUserUseCaseMock: jest.Mocked<ProfileUserUseCase>;
    let uploadAvatarUserUserCaseMock: jest.Mocked<UploadAvatarUserUseCase>;


    

    beforeEach( () => {
        createUserUseCaseMock = {
            execute: jest.fn(),
          } as unknown as jest.Mocked<CreateUserUseCase>; 


          profileUserUseCaseMock = {
            execute: jest.fn(),
          } as unknown as jest.Mocked<ProfileUserUseCase>;

          uploadAvatarUserUserCaseMock = {
            execute: jest.fn(),
          } as unknown as jest.Mocked<UploadAvatarUserUseCase>;


          userController = new UserController(
            createUserUseCaseMock,
            profileUserUseCaseMock,
            uploadAvatarUserUserCaseMock
          );
    })

    it("should create a new user", async () => {
        const userData: CreateUserDTO = {
            email: 'email@test.com',
            name: 'name test',
            password: '1234',
            username: 'username_test'
        }
        let createdUser = {
            id: "123456",
            email: 'email@test.com',    
            name: 'name test',
            username: 'username_test',
            password: 'hashedPassword', 
            avatarUrl: null, 
            createdAt: new Date() 
        }

        let responseUser = {
            email: 'email@test.com',    
            name: 'name test',
            username: 'username_test',
          
        }
        createUserUseCaseMock.execute.mockResolvedValueOnce(createdUser);
    
        const result = await userController.create(userData);
    
        expect(createUserUseCaseMock.execute).toHaveBeenCalledWith(userData);
       

        expect(result).toStrictEqual(responseUser);
      });
})