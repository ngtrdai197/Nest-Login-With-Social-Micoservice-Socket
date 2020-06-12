import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './common/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GateWayModule } from './gate-way/gate-way.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    SharedModule,
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    GateWayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
