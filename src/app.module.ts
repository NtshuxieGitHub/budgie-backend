import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ENV from './config/config';
import { Connection } from 'mongoose';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(ENV.db_uri, {
      onConnectionCreate: (connection: Connection) => {
        const logger = AppModule.logger;
        connection.once('open', () => logger.log('Connected to Budgie DB'));

        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static readonly logger = new Logger(AppModule.name, { timestamp: true });
  constructor() {
    AppModule.logger.log(`Budgie Server is up and running on port:${ENV.port}`);
  }
}
