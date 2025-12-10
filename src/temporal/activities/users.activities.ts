import { UserDocument, User } from '../../schemas/user.schema';
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
import { generateRandomCode, getUserModel } from '../lib/helpers';
import mongoose from 'mongoose';

const logger = new Logger('UserActivities');
const jwtService = new JwtService();
const userModel = getUserModel();

export async function createUser(user: SignUpDTO): Promise<UserDocument> {
  try {
    const hashedUserPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedUserPassword;
    const newUser = new userModel(user);
    return await newUser.save();
  } catch (error) {
    logger.error('Failed to create new user ', error.stack || error);
    throw error;
  }
}

export async function sendVerificationEmail(
  userId: userIdDTO,
): Promise<UserDocument> {
  try {
    const verificationCode = generateRandomCode();
    const verificationExpiryDate = new Date(Date.now() + 5 * 60 * 1000);

    const user = await userModel.findById(
      new mongoose.Types.ObjectId(userId.id),
    );
    if (!user) throw new Error('User not found');

    user.verificationCode = verificationCode;
    user.verificationExpires = verificationExpiryDate;

    await mailTransporter.sendMail({
      to: user.email,
      subject: 'Email Verification Required for your Budgie Account',
      html: `<p>Your verification code is <b>${verificationCode}</b></p>`,
    });

    return await user.save();
  } catch (error) {
    logger.error(
      'Failed to send user verification email ',
      error.stack || error,
    );
    throw error;
  }
}

export async function verifyUserEmail(
  verificationData: UserVerificationDTO,
): Promise<UserDocument> {
  try {
    const { email, code } = verificationData;
    const user = await userModel.findOne({ email });

    user.verified = true;
    user.verificationCode = null;
    user.verificationExpires = null;
    return await user.save();
  } catch (error) {
    logger.error('Error verifying user email account', error.stack || error);
    throw error;
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
    logger.error('Failed to sign user in', error.stack || error);
    throw error;
  }
}

export async function deleteUserAccount(userId: userIdDTO): Promise<void> {
  try {
    const deletionResult = await userModel.findByIdAndDelete(userId);
    if (!deletionResult) throw new Error('User account not found.');

    deletionResult.deletedAt = new Date();
    await deletionResult.save();
  } catch (error) {
    logger.error('Failed to delete user account', error.stack || error);
    throw new Error('Failed to delete user account');
  }
}

export async function getUserById(
  userId: userIdDTO,
): Promise<UserDocument | null> {
  const user = await userModel.findById(new mongoose.Types.ObjectId(userId.id));
  return user;
}

const mailTransporter = nodemailer.createTransport({
  host: ENV.email_host,
  port: Number(ENV.email_port),
  secure: false,
  auth: {
    user: ENV.email_username,
    pass: ENV.email_password,
  },
});
