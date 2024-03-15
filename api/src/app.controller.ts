import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticatedRequest, AuthGuard } from './auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('status')
  @HttpCode(HttpStatus.OK)
  getHello(): { status: 'OK' } {
    return { status: 'OK' };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('protected')
  getProtectedHello(@Request() req: AuthenticatedRequest): string {
    return `Hello ${req.jwt.email}!`;
  }
}
