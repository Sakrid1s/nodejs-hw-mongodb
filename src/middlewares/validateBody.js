import createHttpError from 'http-errors';

export const validateBody = (validationSchema) => async (req, res, next) => {
  try {
    await validationSchema.validateAsync(req.body, {
      convert: false,
      abortEarly: false,
    });
    next();
  } catch (error) {
    const err = createHttpError(400, 'Bad request', {
      errors: error.details,
    });
    next(err);
  }
};
