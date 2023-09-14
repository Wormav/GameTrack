import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import File from '../utils/file';

export const uploadSingleFile = (subFolder: string, fieldName: string) => {
  const storage = multer.diskStorage({
    destination(_req, _file, cb) {
      const folderPath = File.getStoragePath(subFolder);
      cb(null, folderPath);
    },
    filename(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, `${uuidv4()}${extension}`);
    },
  });

  const limits = {
    fieldSize: File.avatarMaxSize,
  };

  return multer({ storage, limits }).single(fieldName);
};
