import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';

const SALT_OR_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registrationDto: RegistrationDto): Promise<void> {
    // todo handle user already exists case
    // todo validate email, password length, etc
    const passwordHash = await bcrypt.hash(
      registrationDto.password,
      SALT_OR_ROUNDS,
    );
    await this.usersService.register({
      email: registrationDto.email,
      passwordHash,
    });
    // TODO: Generate a JWT and return it here
  }
}
