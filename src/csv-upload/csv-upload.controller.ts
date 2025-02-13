import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvUploadService } from './csv-upload.service';
import { diskStorage } from 'multer';

@Controller('upload')
export class CsvUploadController {
  constructor(private readonly csvUploadService: CsvUploadService) {}

  @Post('csv')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
      }
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(csv)$/)) {
        return callback(new Error('Only CSV files are allowed!'), false);
      }
      callback(null, true);
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.csvUploadService.processCsv(file.path, file.originalname);
  }
}
