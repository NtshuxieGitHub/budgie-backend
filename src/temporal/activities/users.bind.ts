import { UserActivities } from './users.activities';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';

const activitiesInstance = new UserActivities(
  Model<UserDocument>,
  MailerService,
  jwtService: JwtService,
});
