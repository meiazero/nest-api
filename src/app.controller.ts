import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import {
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger'
import { IsPublic } from './app/auth/decorators/is-public.decorator'

@ApiTags('default')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @IsPublic()
    @Get()
    getDefault(): string {
        return 'Check the route <a href="/docs">/docs</a> to see the API documentation'
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a Hello World message.' })
    @ApiResponse({ status: 200, description: 'Hello World' })
    @Get('/hello')
    @ApiHeader({
        name: 'Authorization',
        description: 'The token we need for auth.'
    })
    getHello(): string {
        return this.appService.getHello()
    }
}
