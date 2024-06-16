import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId =
  (idName = 'contactId') =>
  (req, res, next) => {
    const contactId = req.params[idName];
    if (!isValidObjectId(contactId)) {
      next(createHttpError(400, `ID is not valid!`));
    }
    next();
  };
