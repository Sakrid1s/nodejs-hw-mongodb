import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenUserController,
} from '../controllers/auth';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const authRouter = Router();

authRouter.post('/register', ctrlWrapper(registerUserController));
authRouter.post('/login', ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh-token', ctrlWrapper(refreshTokenUserController));

export default authRouter;
