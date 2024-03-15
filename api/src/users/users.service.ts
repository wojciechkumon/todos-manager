import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

const POSTGRES_DUPLICATE_KEY_VIOLATION_CODE = '23505';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Saves a new user to the database. Returns the ID of the new user.
   */
  async register(createUserDto: CreateUserDto): Promise<string> {
    const user = new User();
    user.email = createUserDto.email;
    user.passwordHash = createUserDto.passwordHash;
    try {
      const { identifiers } = await this.usersRepository.insert(user);
      const userIdentifier = identifiers[0] as Pick<User, 'id'>;
      return userIdentifier.id;
    } catch (e) {
      if (e.code === POSTGRES_DUPLICATE_KEY_VIOLATION_CODE) {
        // there is a validation of existing email during input validation but
        // due to other requests there is still a little chance to have it here
        throw new BadRequestException('email already exists', {
          cause: e,
          description: 'email already exists',
        });
      }

      this.logger.error('Internal server error during user creation', e.stack);
      throw new InternalServerErrorException(
        'Internal server error during user creation',
        { cause: e, description: 'Internal server error during user creation' },
      );
    }
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
