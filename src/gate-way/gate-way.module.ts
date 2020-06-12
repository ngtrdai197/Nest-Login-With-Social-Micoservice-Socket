import { Module } from '@nestjs/common';

import { EventGateway } from './events.gateway';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  providers: [EventGateway],
})
export class GateWayModule {}
