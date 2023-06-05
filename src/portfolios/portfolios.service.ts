import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/images/image.model';
import { ImagesService } from 'src/images/images.service';
import { CreatePortfolioDto } from './dto/portfolios.dto';
import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(Portfolio)
    private readonly portfolioModel: typeof Portfolio,
    private imagesService: ImagesService,
  ) {}

  async getPortfolioById(id: string): Promise<Portfolio> {
    return await this.portfolioModel.findByPk(id);
  }

  async createPortfolio(
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    return await this.portfolioModel.create(createPortfolioDto);
  }

  async uploadImage(
    portfolioId: string,
    file: Express.Multer.File,
  ): Promise<Image> {
    const portfolio = await this.portfolioModel.findByPk(portfolioId);
    const image = await this.imagesService.createImage({
      name: file.filename,
      description: 'Image description',
      portfolioId: portfolio.id,
      comments: 'Image comments',
    });
    return image;
  }

  async deletePortfolioCascade(id: string): Promise<number> {
    return await Portfolio.destroy({
      where: { id },
      cascade: true,
    });
  }
}
