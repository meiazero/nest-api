import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { IsPublic } from './auth/decorator/is-public.decorator'
import { CurrentUser } from './auth/decorator/current-user.decorator.ts'
import { User } from './user/entities/user.entity'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @IsPublic()
    @Get()
    getInfos(): string {
        return this.appService.getInfos()
    }

    @IsPublic()
    @Get('hello')
    getHello(): string {
        return this.appService.getHello()
    }
}
