import { v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY_VARS } from '../constants/constants.js';
import { env } from './env.js';

cloudinary.config({
  secure: true,
  cloud_name: env(CLOUDINARY_VARS.CLOUD_NAME),
  api_key: env(CLOUDINARY_VARS.API_KEY),
  api_secret: env(CLOUDINARY_VARS.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path);

  return response.secure_url;
};
