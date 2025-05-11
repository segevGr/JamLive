import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SongSessionModule } from './song-session/song-session.module';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    UsersModule,
    AuthModule,
    SongSessionModule,
    SongsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector) => {
        return new JwtAuthGuard(reflector);
      },
      inject: [Reflector],
    },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector) => {
        return new RolesGuard(reflector);
      },
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
