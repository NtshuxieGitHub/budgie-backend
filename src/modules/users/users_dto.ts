/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
} from 'class-validator';
import { UserDocument } from 'src/schemas/user.schema';

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
}

export class SignInDTO {
  id: string;
  password: string;
}

export class userIdDTO {
  id: string;
}

export class signUpWorkflowDTO {
  success: boolean;
  message: string;
  data: UserDocument;
}

export class accountVerificationWorkflowDTO {
  success: boolean;
  message: string;
  verificationCode: string;
}

export class userAccountDeletionWorkflowDTO {
  success: true;
  message: string;
}

export class userSignInWorkflowDTO {
  success: boolean;
  message: string;
  token: string;
  data: UserDocument;
}
