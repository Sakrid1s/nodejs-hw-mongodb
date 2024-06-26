import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(32),
  /*
  role: Joi.string().valid('user', 'admin').default('user'),
  */
});
