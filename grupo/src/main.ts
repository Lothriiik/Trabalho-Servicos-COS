// grupo/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Documentação da API - Desenvolvedores')
    .setDescription(
      'Esta documentação abrangente serve como um guia essencial para desenvolvedores em geral',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({ origin: true });

  await app.listen(1411, '0.0.0.0');
}
bootstrap();
