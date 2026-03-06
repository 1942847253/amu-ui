import { Module } from '@nestjs/common'
import { AccessControlModule } from '../access-control/access-control.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [AccessControlModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
