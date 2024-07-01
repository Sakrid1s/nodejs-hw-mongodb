import fs from 'fs/promises';
import path from 'path';

import { DIR_VARS, ENV_VARS } from '../constants/constants.js';
import { env } from './env.js';

export const saveFileLocally = async (file) => {
  const content = await fs.readFile(file.path);
  const newPath = path.join(DIR_VARS.UPLOAD_DIR, file.filename);
  await fs.writeFile(newPath, content);
  await fs.unlink(file.path);

  return env(ENV_VARS.BACKEND_DOMAIN) + `/uploads/${file.filename}`;
};
