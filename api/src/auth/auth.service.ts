import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { JwtDto } from './dto/jwt.dto';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string; // user ID
  email: string;
}

export const SALT_OR_ROUNDS = 12;
const UNAUTHORIZED_ERROR_MESSAGE = 'Invalid email or password';

/**
 * Service responsible for handling user registration and login.
 * It uses JWT for auth.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registrationDto: RegistrationDto): Promise<JwtDto> {
    const passwordHash = await bcrypt.hash(
      registrationDto.password,
      SALT_OR_ROUNDS,
    );
    const userId = await this.usersService.register({
      email: registrationDto.email,
      passwordHash,
    });

    const jwtPayload: JwtPayload = {
      sub: userId,
      email: registrationDto.email,
    };
    return this.createJwtResponse(jwtPayload);
  }

  async login(loginDto: LoginDto): Promise<JwtDto> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR_MESSAGE);
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException(UNAUTHORIZED_ERROR_MESSAGE);
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    return this.createJwtResponse(jwtPayload);
  }

  private async createJwtResponse(jwtPayload: JwtPayload): Promise<JwtDto> {
    const jwt = await this.jwtService.signAsync(jwtPayload);
    return {
      token_type: 'Bearer',
      access_token: jwt,
    };
  }
}
