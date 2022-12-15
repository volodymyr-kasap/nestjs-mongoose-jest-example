import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as basicAuth from 'express-basic-auth';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';


const globalPrefix = 'api';

function setupSwagger (app: INestApplication, configService: ConfigService) {
  const swaggerRouter = `/${globalPrefix}/docs`;

  app.use([swaggerRouter], basicAuth({
    challenge: true,
    users: {
      [configService.getOrThrow('SWAGGER_USER')]: configService.getOrThrow('SWAGGER_PASSWORD'),
    },
  }));

  const swaggerConfig: Omit<OpenAPIObject, 'components' | 'paths'> =
    new DocumentBuilder()
      .setTitle('Node tracking app')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(swaggerRouter, app, document);
}

function setupPipes (app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
}

async function bootstrap () {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  setupSwagger(app, configService);
  setupPipes(app);

  const port = configService.getOrThrow('APP_PORT');
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
