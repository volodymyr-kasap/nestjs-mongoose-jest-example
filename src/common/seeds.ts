import { NestFactory } from '@nestjs/core';

import { AppModule } from '$/app.module';
import { TrackingSeed } from '$/tracking/seeds';


async function bootstrap () {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const seed = await app.get(TrackingSeed);
    await seed.createMany();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
  }
}

bootstrap();
