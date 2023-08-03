import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    )

    // Documentation
    const config = new DocumentBuilder()
        .setTitle('Rest API - NestJS')
        .setDescription('Api to manage users and authentification')
        .setVersion('0.1.0')
        .addTag('users')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    await app.listen(3000)
}

bootstrap()
