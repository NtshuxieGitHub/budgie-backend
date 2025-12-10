import { model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import {
  SignInDTO,
  SignUpDTO,
  UserVerificationDTO,
  userIdDTO,
} from '../../modules/users/users_dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import ENV from '../../config/config';
import nodemailer from 'nodemailer';

const logger = new Logger('UserActivities');
const userModel = model<UserDocument>(User.name);
const jwtService = new JwtService();

export async function createUser(user: SignUpDTO): Promise<UserDocument> {
  try {
    const hashedUserPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedUserPassword;
    const newUser = new userModel(user);
    return await newUser.save();
  } catch (error) {
    logger.log('Failed to create new user ', error);
    throw new Error('Failed to create new user');
  }
}

export async function sendVerificationEmail(user: UserDocument): Promise<void> {
  try {
    const verificationCode = generateRandomCode();
    const verificationExpiryDate = new Date(Date.now() + 2 * 60 * 1000);

    user.verificationCode = verificationCode;
    user.verificationExpires = verificationExpiryDate;
    await user.save();

    await mailTransporter.sendMail({
      to: user.email,
      subject: 'Email Verification Required for your Budgie Account',
      html: `<p>Your verification code is <b>${verificationCode}</b></p>`,
    });
  } catch (error) {
    logger.log('Failed to send user verification email', error);
    throw new Error('Failed to send user verification email');
  }
}

export async function verifyUserEmail(verificationData: UserVerificationDTO) {
  try {
    const { email, code } = verificationData;
    const user = await userModel.findOne({ email });
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
    logger.log('Error verifying user email account', error);
    throw new Error('Error verifying user email account');
  }
}

export async function signUserIn(
  userSignInDetails: SignInDTO,
): Promise<{ token: string; data: UserDocument }> {
  try {
    const { id, password } = userSignInDetails;

    const user = await userModel.findOne({
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
    const jwtToken = jwtService.sign(payload);

    return {
      token: jwtToken,
      data: user,
    };
  } catch (error) {
    logger.log('Failed to sign user in', error);
    throw new Error('Failed to sign user in');
  }
}

export async function deleteUserAccount(userId: userIdDTO): Promise<void> {
  try {
    const deletionResult = await userModel.findByIdAndDelete(userId);
    if (!deletionResult) throw new Error('User account not found.');

    deletionResult.deletedAt = new Date();
    await deletionResult.save();
  } catch (error) {
    logger.log('Failed to delete user account', error);
    throw new Error('Failed to delete user account');
  }
}

function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const mailTransporter = nodemailer.createTransport({
  host: ENV.email_host,
  port: Number(ENV.email_port),
  secure: false,
  auth: {
    user: ENV.email_username,
    pass: ENV.email_password,
  },
});
