import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Public } from './common/decorators/public.decorator'
import { PrismaService } from './database/prisma.service'

@ApiTags('system')
@Controller()
export class PublicController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get('health/live')
  getLiveness() {
    return {
      status: 'ok',
      service: 'amu-admin-server',
      check: 'live',
      timestamp: new Date().toISOString()
    }
  }

  @Public()
  @Get('health/ready')
  async getReadiness() {
    await this.prisma.$queryRaw`SELECT 1`
    return {
      status: 'ok',
      service: 'amu-admin-server',
      check: 'ready',
      database: 'up',
      timestamp: new Date().toISOString()
    }
  }

  @Public()
  @Get('health')
  async getHealth() {
    return this.getReadiness()
  }
}
