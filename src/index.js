import { setupServer } from './server.js';

import { DIR_VARS } from './constants/constants.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createFolderIfNotExist } from './utils/createFolderIfNotExist.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createFolderIfNotExist(DIR_VARS.TEMP_UPLOAD_DIR);
  await createFolderIfNotExist(DIR_VARS.UPLOAD_DIR);
  setupServer();
};

bootstrap();
