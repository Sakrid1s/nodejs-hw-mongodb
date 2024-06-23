import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenUserController,
} from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserValidationSchema } from '../validations/registerUserValidationSchema';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post('/login', ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh-token', ctrlWrapper(refreshTokenUserController));

export default authRouter;
