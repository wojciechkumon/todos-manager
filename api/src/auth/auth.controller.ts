import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { JwtDto } from './dto/jwt.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  register(@Body() registrationDto: RegistrationDto): Promise<JwtDto> {
    return this.authService.register(registrationDto);
  }
}
