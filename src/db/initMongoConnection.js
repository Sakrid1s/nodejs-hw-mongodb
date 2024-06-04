import mongoose from 'mongoose';

import { env } from '../utils/env.js';
import { MONGO_VARS } from '../constants/constants.js';

export const initMongoConnection = async () => {
  const user = env(MONGO_VARS.MONGODB_USER);
  const password = env(MONGO_VARS.MONGODB_PASSWORD);
  const url = env(MONGO_VARS.MONGODB_URL);
  const dataBase = env(MONGO_VARS.MONGODB_DB, '');

  await mongoose.connect(
    `mongodb+srv://${user}:${password}@${url}/${dataBase}?retryWrites=true&w=majority&appName=Cluster-Sakridis`,
  );
  console.log('Mongo connection successfully established!');
};
