import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import { IsPublic } from './auth/decorator/is-public.decorator'

@ApiTags('users')
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
