import { createUser, loginUser } from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await createUser(req.body);

  res.json({
    status: 201,
    message: 'User successfully created',
    data: { user },
  });
};

export const loginUserController = async (req, res, next) => {
  const user = await loginUser(req.body);

  res.json({
    status: 200,
    message: 'User successfully logged in',
    data: { user },
  });
};

export const logoutUserController = async (req, res, next) => {};

export const refreshTokenUserController = async (req, res, next) => {};
