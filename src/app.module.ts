import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { UserService } from './services/user.service';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService, AuthService, JwtStrategy, UserService],
})
export class AppModule { }
