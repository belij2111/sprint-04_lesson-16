import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SecurityDevicesService } from '../application/security-devices.service';
import { SecurityDevicesQueryRepository } from '../infrastructure/security-devices.query-repository';
import { CurrentUserId } from '../../../core/decorators/param/current-user-id.param.decorator';
import { RefreshTokenGuard } from '../../../core/guards/refresh-token.guard';

@Controller('/security')
export class SecurityDevicesController {
  constructor(
    private readonly securityDevicesService: SecurityDevicesService,
    private readonly securityDevicesQueryRepository: SecurityDevicesQueryRepository,
  ) {}

  @Get('/devices')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  async getAll(@CurrentUserId() currentUserId: string) {
    return await this.securityDevicesQueryRepository.getAll(currentUserId);
  }
}