import dotenv from 'dotenv';

dotenv.config();

export const env = (envName) => {
  const value = process.env[`${envName}`];
  return value;
};
