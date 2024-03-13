import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<string> {
    const user = new User();
    user.email = createUserDto.email;
    user.passwordHash = createUserDto.passwordHash;
    try {
      const { identifiers } = await this.usersRepository.insert(user);
      return identifiers[0].id;
    } catch (e) {
      // todo throw exception and handle returning HTTP code
      console.error('error: ', e);
    }
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
