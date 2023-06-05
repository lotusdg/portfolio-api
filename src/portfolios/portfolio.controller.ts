import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerConfig } from 'src/config/multer.config';
import { Image } from 'src/images/image.model';
import { IGetUserAuthInfoRequest } from 'src/types/interfaces';
import { CreatePortfolioDto } from './dto/portfolios.dto';
import { Portfolio } from './portfolio.model';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfolioController {
  constructor(private portfoliosService: PortfoliosService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  async createPortfolio(
    @Body() createPortfolioDto: CreatePortfolioDto,
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<Portfolio> {
    if (req.user.id !== createPortfolioDto.userId)
      throw new ForbiddenException();
    return this.portfoliosService.createPortfolio(createPortfolioDto);
  }

  @Post(':portfolioId/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('portfolioId') portfolioId: string,
  ): Promise<Image> {
    const image = await this.portfoliosService.uploadImage(portfolioId, file);
    return image;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePortfolio(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<Response<any, Record<string, any>>> {
    const portfolio = await this.portfoliosService.getPortfolioById(id);
    if (portfolio && portfolio.userId !== req.user.id)
      throw new ForbiddenException();
    await this.portfoliosService.deletePortfolioCascade(id);
    return res.status(204).send();
  }
}
