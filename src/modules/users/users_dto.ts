/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
} from 'class-validator';

export class SignUpDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  surname: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @IsOptional()
  verificationCode: string;

  @IsDate()
  @IsOptional()
  verificationExpires: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date;
}

export class UserVerificationDTO {
  email: string;
  code: string;
  workflowId: string;
}

export class SignInDTO {
  id: string;
  password: string;
}

export class userIdDTO {
  id: string;
}
