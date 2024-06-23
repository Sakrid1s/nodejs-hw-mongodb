import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { TIME_VARS } from '../constants/constants.js';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const createSessionToken = () => {
  return {
    accessToken: crypto.randomBytes(20).toString('base64'),
    refreshToken: crypto.randomBytes(20).toString('base64'),
    accessTokenValidUntil: Date.now() + TIME_VARS.FIFTEEN_MINUTES,
    refreshTokenValidUntil: Date.now() + TIME_VARS.ONE_WEEK,
  };
};

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

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSessionToken(),
  });
};

export const logoutUser = async (sessionData) => {
  const { sessionId, sessionToken } = sessionData;
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const refreshSession = async (sessionData) => {
  const { sessionId, sessionToken } = sessionData;

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user._id,
    ...createSessionToken(),
  });
};
