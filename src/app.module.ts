import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ENV from 'src/config/config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.db_uri, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('Connected to Budgie DB'));

        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
