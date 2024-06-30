import { ENV_VARS } from '../constants/constants';
import { env } from './env.js';
import { saveFileLocally } from './saveFileLocally.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';

export const saveFileOptions = async (file) => {
  let url;

  if (env(ENV_VARS.IS_CLOUDINARY_SAVE)) {
    url = await saveFileToCloudinary(file);
  } else {
    url = await saveFileLocally(file);
  }
  return url;
};
