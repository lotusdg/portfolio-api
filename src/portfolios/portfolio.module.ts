import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageModule } from 'src/images/image.module';
import { PortfolioController } from './portfolio.controller';
import { Portfolio } from './portfolio.model';
import { PortfoliosService } from './portfolios.service';

@Module({
  imports: [SequelizeModule.forFeature([Portfolio]), ImageModule],
  controllers: [PortfolioController],
  providers: [PortfoliosService],
})
export class PortfolioModule {}
