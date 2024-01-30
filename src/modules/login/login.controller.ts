import { Body, Controller, Post } from "@nestjs/common";
import { SignInDTO } from "./dto/sign-in.dto";
import { SignInUseCase } from "./useCases/sign-in.usecase";



@Controller()
export class LoginController {

    constructor(private signInUserCase: SignInUseCase){}


    @Post("signIn")
    async signIn(@Body() signInDTO: SignInDTO) {

        const token = this.signInUserCase.execute(signInDTO);
        return token;
    }
}
