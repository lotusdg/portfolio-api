import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { Portfolio } from 'src/portfolios/portfolio.model';
import { CreateImageDto } from './dto/images.dto';
import { Image } from './image.model';
import { promises as fsPromises } from 'fs';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image)
    private readonly imageModel: typeof Image,
  ) {}

  async getAllImages(): Promise<Image[]> {
    return this.imageModel.findAll();
  }

  async getImageByIdWithPortfolio(id: string): Promise<Image> {
    return this.imageModel.findByPk(id, {
      include: [Portfolio],
    });
  }

  async createImage(createImageDto: CreateImageDto): Promise<Image> {
    return this.imageModel.create(createImageDto);
  }

  async deleteImage(id: string): Promise<number> {
    return this.imageModel.destroy({ where: { id } });
  }

  async getImageFeed(): Promise<any[]> {
    const images = await this.imageModel.findAll({
      include: [{ model: Portfolio, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    });

    const imageFeed = await Promise.all(
      images.map(async (image) => {
        const {
          name,
          description,
          portfolio: { name: portfolioName },
        } = image;
        const filePath = join('./uploads', name);
        const fileData = await fsPromises.readFile(filePath, 'base64');

        return {
          name,
          description,
          portfolioName,
          fileData,
        };
      }),
    );

    return imageFeed;
  }
}
