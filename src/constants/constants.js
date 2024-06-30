import path from 'path';

export const MONGO_VARS = {
  PORT: 'PORT',
  APP_DOMAIN: 'APP_DOMAIN',
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

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
