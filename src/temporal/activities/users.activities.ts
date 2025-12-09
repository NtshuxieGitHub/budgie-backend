import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { model } from 'mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import {
  SignInDTO,
  SignUpDTO,
  UserVerificationDTO,
  userIdDTO,
} from '../../modules/users/users_dto';
import bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import ENV from 'src/config/config';

interface MailerOpts {
  host: string;
  port: number;
  username: string;
  password: string;
}

const { email_host, email_port, email_username, email_password } = ENV;
const mailOpts: MailerOpts = {
  host: email_host,
  port: Number(email_port),
  username: email_username,
  password: email_password,
};

const logger = new Logger('UserActivities', {
  timestamp: true,
});

const userModel: Model<UserDocument> = model<UserDocument>('User');
const mailerService = new MailerService(mailOpts);
const jwtService = new JwtService();

@Injectable()
export class UserActivities {
  private readonly logger = new Logger(UserActivities.name, {
    timestamp: true,
  });

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private mailService: MailerService,
    private jwtService: JwtService,
  ) {}

  async createUser(user: SignUpDTO): Promise<UserDocument> {
    try {
      const hashedUserPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedUserPassword;
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error) {
      this.logger.log('Failed to create new user ', error);
      throw new Error('Failed to create new user');
    }
  }

  async sendVerificationEmail(user: UserDocument): Promise<void> {
    try {
      const verificationCode = this.generateRandomCode();
      const verificationExpiryDate = new Date(Date.now() + 2 * 60 * 1000);

      user.verificationCode = verificationCode;
      user.verificationExpires = verificationExpiryDate;
      await user.save();

      await this.mailService.sendMail({
        to: user.email,
        subject: 'Email Verification Required for your Budgie Account',
        template: './verification_email',
        context: { code: user.verificationCode },
      });
    } catch (error) {
      this.logger.log('Failed to send user verification email', error);
      throw new Error('Failed to send user verification email');
    }
  }

  async verifyUserEmail(verificationData: UserVerificationDTO) {
    try {
      const { email, code } = verificationData;
      const user = await this.userModel.findOne({ email });
      if (!user) throw new Error('User not found.');

      if (user.verified) return;

      if (!user.verificationCode || user.verificationCode !== code) {
        throw new Error('Verification code is inavlid or incorrect.');
      }

      if (!user.verificationExpires || user.verificationExpires < new Date()) {
        throw new Error('Verification code has expired.');
      }

      user.verified = true;
      user.verificationCode = null;
      user.verificationExpires = null;
      await user.save();
    } catch (error) {
      this.logger.log('Error verifying user email account', error);
      throw new Error('Error verifying user email account');
    }
  }

  async signUserIn(
    userSignInDetails: SignInDTO,
  ): Promise<{ token: string; data: UserDocument }> {
    try {
      const { id, password } = userSignInDetails;

      const user = await this.userModel.findOne({
        $or: [{ email: id }, { username: id }],
      });

      if (!user) throw new Error('User email or username is invalid.');

      if (!user.verified) throw new Error('User is unverified.');

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('User password is invalid.');

      const payload = {
        userId: user._id,
        email: user.email,
        username: user.username,
      };
      const jwtToken = this.jwtService.sign(payload);

      return {
        token: jwtToken,
        data: user,
      };
    } catch (error) {
      this.logger.log('Failed to sign user in', error);
      throw new Error('Failed to sign user in');
    }
  }

  async deleteUserAccount(userId: userIdDTO): Promise<void> {
    try {
      const deletionResult = await this.userModel.findByIdAndDelete(userId);
      if (!deletionResult) throw new Error('User account not found.');

      deletionResult.deletedAt = new Date();
      await deletionResult.save();
    } catch (error) {
      this.logger.log('Failed to delete user account', error);
      throw new Error('Failed to delete user account');
    }
  }

  // TODO: async updateUserPassword() {}

  private generateRandomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
