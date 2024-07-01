import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs/promises';
import handlebars from 'handlebars';

import {
  DIR_VARS,
  EMAIL_VARS,
  ENV_VARS,
  JWT_VARS,
  TIME_VARS,
} from '../constants/constants.js';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendEmail.js';

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

export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env(JWT_VARS.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    DIR_VARS.TEMPLATES_DIR,
    'send-reset-password.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${env(ENV_VARS.APP_DOMAIN)}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env(EMAIL_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.log(error);

    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (userData) => {
  let entries;
  try {
    entries = jwt.verify(userData.token, env(JWT_VARS.JWT_SECRET));
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw error;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  await User.updateOne({ _id: user._id }, { password: encryptedPassword });
  await Session.deleteMany({ userId: user._id });
};
