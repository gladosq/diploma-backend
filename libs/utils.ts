import {extension} from 'mime-types';
import * as crypto from 'node:crypto';
import * as path from 'path';
import * as sharp from 'sharp';

export class Helper {
  static customFileName(req, file, cb) {
    const uuid = crypto.randomUUID();

    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;

    cb(null, hashName);
  }

  static destinationPath(req, file, cb) {

    // console.log('file:', file);
    // sharp(`./uploads/${file.originalname}`)
    //   .resize(1000)
    //   .webp()
    //   .toBuffer();

    cb(null, './uploads/');
  }
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getLocalization = (localization: number) => {
  if (localization === 3) {
    return [1,2];
  }

  return [localization];
}

export const getKeyName = (array: any, value: number) => {
  return array[value];
};
