import { NestFactory } from '@nestjs/core';
import { initialize, session } from 'passport';
import { Logger } from '@nestjs/common';
import { RedisIoAdapter } from './gate-way/redis-io.adapter';
import * as chalk from 'chalk';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(initialize());
  app.use(session());
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(3000, () => {
    new Logger().log(
      `${chalk.bold.magentaBright.bgBlack(
        `Nest server started at port:`,
      )} ${chalk.bold.cyanBright('3000')}`,
      `${chalk.bold('Bootstrap')}`,
    );
  });
}

bootstrap();
