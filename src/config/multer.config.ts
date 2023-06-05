import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { imageFilter } from 'src/filters/images.filter';

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (
      _req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
  fileFilter: imageFilter,
};
