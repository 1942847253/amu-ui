import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AccessControlModule } from './access-control/access-control.module'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { PublicController } from './public.controller'
import { PublicGuard } from './common/guards/public.guard'
import { PermissionGuard } from './common/guards/permission.guard'
import { RoleGuard } from './common/guards/role.guard'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.AMU_ADMIN_ACCESS_SECRET || 'amu-admin-access-secret',
      signOptions: { expiresIn: '15m' }
    }),
    DatabaseModule,
    AccessControlModule,
    AuthModule,
    DashboardModule
  ],
  controllers: [PublicController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PublicGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ]
})
export class AppModule {}
