import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PortfolioModule } from './portfolios/portfolio.module';
import { ImageModule } from './images/image.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import dbOptions from './config/database.config';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './filters/exceptions.filter';

@Module({
  imports: [
    SequelizeModule.forRoot(dbOptions),
    UserModule,
    PortfolioModule,
    ImageModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
