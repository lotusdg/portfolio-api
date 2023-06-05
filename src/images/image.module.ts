import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageController } from './images.controller';
import { Image } from './image.model';
import { ImagesService } from './images.service';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImageModule {}
