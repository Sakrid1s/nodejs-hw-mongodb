import { ENV_VARS } from '../constants/constants.js';
import { env } from './env.js';
import { saveFileLocally } from './saveFileLocally.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';

export const saveFileOptions = async (file) => {
  let url;

  const isCloudinary = env(ENV_VARS.IS_CLOUDINARY_SAVE);

  if (isCloudinary === 'true') {
    url = await saveFileToCloudinary(file);
  } else {
    url = saveFileLocally(file);
  }
  return url;
};
