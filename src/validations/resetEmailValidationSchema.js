import Joi from 'joi';

export const resetEmailValidationSchema = Joi.object({
  email: Joi.string().email().required(),
});
