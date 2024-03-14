import { IsEmail, MaxLength, IsStrongPassword } from 'class-validator';
import { IsEmailUnique } from '../../users/validators/IsEmailUnique';

export const EMAIL_MAX_LENGTH = 254;
export const PASSWORD_MAX_LENGTH = 250;

export class RegistrationDto {
  @IsEmail()
  @MaxLength(EMAIL_MAX_LENGTH)
  @IsEmailUnique({ message: 'email already exists' })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
    minNumbers: 0,
  })
  @MaxLength(PASSWORD_MAX_LENGTH)
  password: string;
}
