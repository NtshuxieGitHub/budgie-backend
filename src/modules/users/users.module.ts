import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { UserController } from './users.controller';
import { UserActivities } from 'src/temporal/activities/users.activities';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import ENV from '../../config/config';
import * as path from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({ secret: ENV.jwt_secret }),
    MailerModule.forRoot({
      transport: {
        host: ENV.email_host,
        port: Number(ENV.email_port),
        secure: false,
        auth: {
          user: ENV.email_username,
          pass: ENV.email_password,
        },
      },
      defaults: { from: '"No Reply" <noreply@budgie.co.za>' },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserActivities],
})
export class UsersModule {}
