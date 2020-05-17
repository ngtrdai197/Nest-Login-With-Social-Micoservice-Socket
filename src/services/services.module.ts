import { Module } from '@nestjs/common';

import { AuthActionsService } from './auth';

const services = [AuthActionsService];

@Module({
  providers: services,
  exports: services,
})
export class ServicesModule {}
