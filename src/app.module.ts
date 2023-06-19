import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import { UserModule } from './user/user.module'

@Module({
    imports: [UserModule, AuthModule],
    controllers: [],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        }
    ]
})
export class AppModule {}
