import multer from 'multer';

import { DIR_VARS } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR_VARS.TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

export const upload = multer({ storage: storage });
