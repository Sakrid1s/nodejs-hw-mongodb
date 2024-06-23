import { TIME_VARS } from '../constants/constants.js';
import { createUser, loginUser, logoutUser } from '../services/auth.js';

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

  res.json({
    status: 201,
    message: 'User successfully created',
    data: { user },
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in',
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

export const refreshTokenUserController = async (req, res, next) => {};
