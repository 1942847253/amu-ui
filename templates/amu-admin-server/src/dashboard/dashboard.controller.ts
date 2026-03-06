import { Controller, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RequirePermissions } from '../common/decorators/permissions.decorator'

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  @RequirePermissions('dashboard:view')
  @Get('overview')
  getOverview() {
    return {
      visits: 12480,
      pendingTickets: 86,
      newUsers: 1024
    }
  }
}
