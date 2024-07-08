import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';

import { DIR_VARS, ENV_VARS } from './constants/constants.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import rootRouter from './routers/index.js';
import { env } from './utils/env.js';

const PORT = env(ENV_VARS.PORT);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(rootRouter);

  app.use('/uploads', express.static(DIR_VARS.UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
