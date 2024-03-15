import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedRequest, AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('protected')
  getProtectedHello(@Request() req: AuthenticatedRequest): string {
    return `Hello ${req.jwt.email}!`;
  }
}
