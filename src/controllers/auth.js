import { TIME_VARS } from '../constants/constants.js';
import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
  requestResetToken,
} from '../services/auth.js';

const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: new Date(Date.now() + TIME_VARS.ONE_WEEK),
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: new Date(Date.now() + TIME_VARS.ONE_WEEK),
  });
};

export const registerUserController = async (req, res, next) => {
  const user = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { user },
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res, next) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};

export const refreshTokenUserController = async (req, res, next) => {
  const session = await refreshSession({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  setupSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const requestResetEmailController = async (req, res, next) => {
  await requestResetToken(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};
