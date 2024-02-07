export type CreateUserDTO = {
    username: string;
    password: string;
    email: string;
    name: string;
}



export type FileDTO = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    buffer: Buffer,
    size: number
}

