import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";



@Module({
    controllers: [NotificationController],
    imports: [
        ClientsModule.register([
            {
                name: 'NOTIFICATION',
                transport: Transport.TCP,
                options: {port: 30002, host: '127.0.0.1'},
            }
        ])
    ]
})

export class NotificationModule{}