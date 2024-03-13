import { IsEmail, MaxLength, IsStrongPassword } from 'class-validator';
import { IsEmailUnique } from '../../users/validators/IsEmailUnique';

export class RegistrationDto {
  @IsEmail()
  @MaxLength(254)
  @IsEmailUnique({ message: 'Email already exists' })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
    minNumbers: 0,
  })
  password: string;
}
