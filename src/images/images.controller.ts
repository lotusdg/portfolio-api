import {
  Controller,
  Delete,
  Param,
  Res,
  UseGuards,
  Request,
  ForbiddenException,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from 'src/types/interfaces';
import { ImagesService } from './images.service';

@Controller('images')
export class ImageController {
  constructor(private imagesService: ImagesService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteImageById(
    @Param('id') id: string,
    @Res() res: Response,
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<Response<any, Record<string, any>>> {
    const image = await this.imagesService.getImageByIdWithPortfolio(id);
    if (image && image.portfolio.userId !== req.user.id)
      throw new ForbiddenException();
    await this.imagesService.deleteImage(id);
    return res.status(204).send();
  }

  @Get('feed')
  async getImageFeed(): Promise<any> {
    const imageFeed = await this.imagesService.getImageFeed();
    return {
      data: imageFeed,
    };
  }
}
