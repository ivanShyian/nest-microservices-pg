if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const microserviceOptions: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'localhost',
    port: 3000,
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, microserviceOptions);
  await app.listen();
}
bootstrap();
