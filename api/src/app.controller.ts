import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedRequest, AuthGuard } from './auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('protected')
  getProtectedHello(@Request() req: AuthenticatedRequest): string {
    return `Hello ${req.jwt.email}!`;
  }
}
