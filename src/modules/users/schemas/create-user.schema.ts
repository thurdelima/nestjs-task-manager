
import { createZodDto } from 'nestjs-zod';
import { password, z } from 'nestjs-zod/z';


export const CreateUserSchema = z.object({
    name: z.string({
        required_error: 'Name is required'
    }),
    password: z.string(),
    username: z.string(),
    email: z.string().email()
})

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) { }

export const CreateUserResponseSchemaDTO = CreateUserSchema.omit({ password: true })

export type CreateUserResponseDTO = z.infer<typeof CreateUserResponseSchemaDTO>