import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenUserController,
  resetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserValidationSchema } from '../validations/registerUserValidationSchema.js';
import { loginUserValidationSchema } from '../validations/loginUserValidationSchema.js';
import { resetEmailValidationSchema } from '../validations/resetEmailValidationSchema.js';
import { resetPasswordValidationSchema } from '../validations/resetPasswordValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidationSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post(
  '/login',
  validateBody(loginUserValidationSchema),
  ctrlWrapper(loginUserController),
);
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh', ctrlWrapper(refreshTokenUserController));
authRouter.post(
  '/send-reset-email',
  validateBody(resetEmailValidationSchema),
  ctrlWrapper(resetEmailController),
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordValidationSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
