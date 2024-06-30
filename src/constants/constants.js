import path from 'path';

export const ENV_VARS = {
  PORT: 'PORT',
  APP_DOMAIN: 'APP_DOMAIN',
  BACKEND_DOMAIN: 'BACKEND_DOMAIN',
  IS_CLOUDINARY_SAVE: 'IS_CLOUDINARY_SAVE',
};

export const MONGO_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TIME_VARS = {
  FIFTEEN_MINUTES: 1000 * 60 * 15,
  ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
};

export const EMAIL_VARS = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const JWT_VARS = {
  JWT_SECRET: 'JWT_SECRET',
};

export const DIR_VARS = {
  TEMPLATES_DIR: path.join(process.cwd(), 'src', 'templates'),
  TEMP_UPLOAD_DIR: path.join(process.cwd(), 'temp'),
  UPLOAD_DIR: path.join(process.cwd(), 'upload'),
};

export const CLOUDINARY_VARS = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};
