import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { JwtDto } from './dto/jwt.dto';

const SALT_OR_ROUNDS = 12;

interface JwtPayload {
  sub: string; // user ID
  email: string;
}

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
    // todo handle user already exists case
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
    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }
}
