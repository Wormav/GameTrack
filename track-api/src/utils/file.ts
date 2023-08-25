import fs from 'fs';
import * as fsPromises from 'fs/promises'
import { createHash } from 'crypto';

class File {
  static storage_folder: string = process.env.MEDIA_ROOT as string;
  static avatarMaxSize: number = 1024 * 1024 * 2; // 2MB
  static avatarAllowedTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  static avatarFolder = 'user/avatar';

  filePath: string;
  
  static {
    if (!fs.existsSync(File.storage_folder)) {
      fs.mkdirSync(File.storage_folder);
    }
  }

  constructor(filePath: string) {
    this.filePath = filePath;
  }
  
  static getStoragePath(folderName: string) {
    const path = `${File.storage_folder}/${folderName}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    return path;
  }
  
  static getStorageFilePath(folderName: string, fileName: string) {
    return `${File.getStoragePath(folderName)}/${fileName}`;
  }
  
  static getFileStream(path: string) {
    return fs.createReadStream(path);
  }

  public async getFileNameFromData(): Promise<string | null> {
    try {
      const data = await fsPromises.open(this.filePath, 'r');
      const hashInstance = createHash('sha1');
      hashInstance.update((await data.read()).buffer);
      await data.close();
      return hashInstance.digest('hex');
    } catch (error) {
      console.error(error)
      return null;
    }
  }

  public delete() {
    fs.unlinkSync(this.filePath);
  }

  public async copyTo(newFileName: string, subFolder: string, unlink=false) {

    const oldPath = this.filePath;
    const newPath = File.getStorageFilePath(subFolder, newFileName);
    if (fs.existsSync(newPath)) {
      return newPath;
    }
    try {
      await fsPromises.copyFile(oldPath, newPath);
      if (unlink) {
        this.delete();
      }
      return newPath;
    } catch (error) {
      console.error(error)
      return null;
    }
  }
}


export default File;
