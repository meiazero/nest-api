import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './app/auth/auth.module'
import { JwtAuthGuard } from './app/auth/guards/jwt-auth.guard'
import { PrismaModule } from './db/prisma/prisma.module'
import { UserModule } from './app/user/user.module'

@Module({
	imports: [PrismaModule, UserModule, AuthModule],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
