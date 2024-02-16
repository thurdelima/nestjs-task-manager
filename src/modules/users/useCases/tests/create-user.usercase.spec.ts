import { Test } from "@nestjs/testing"
import { CreateUserUseCase } from "../create-user.usecase"
import { CreateUserDTO } from "../../dto/user.dto";
import { PrismaService } from "../../../../infra/database/prisma.service";
import { hash } from "bcrypt";

const prismaServiceMock = {
    user: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
};

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
  }));

describe("CreateUserCase test suite", () => {

    let createUserUseCase: CreateUserUseCase;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CreateUserUseCase,
                { provide: PrismaService, useValue: prismaServiceMock }
            ]
        }).compile()

        createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
        jest.clearAllMocks();   
    })


    it("Should be able to create a new user", async () => {

        prismaServiceMock.user.findFirst.mockResolvedValueOnce(null);

        (hash as jest.Mock).mockResolvedValueOnce("hashedPassword");

        const data: CreateUserDTO = {
            email: 'email@test.com',
            name: 'name test',
            password: '1234',
            username: 'username_test'
        }


        await createUserUseCase.execute(data);
        

        expect(prismaServiceMock.user.findFirst).toHaveBeenCalledWith({
            where: {
              OR: [{ username: data.username }, { email: data.email }],
            },
          });
          expect(hash).toHaveBeenCalledWith(data.password, 10);
      
          
          expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
            data: {
              ...data,
              password: "hashedPassword",
            },
          });


    })
})