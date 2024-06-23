import bcrypt from 'bcrypt';

import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw createHttpError(
      409,
      `The user with email: ${userData.email} already exists in the database`,
    );
  }

  return await User.create({ ...userData, password: hashedPassword });
};

export const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) {
    throw createHttpError(401, 'Incorrect email or password');
  }

  return user;
};

export const logoutUser = async () => {};
