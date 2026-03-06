import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle('amu-admin-server')
    .setDescription('企业级后台权限管理服务端模板')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(3000)
}

void bootstrap()
