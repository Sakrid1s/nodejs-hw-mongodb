import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createHttpError(400, `No contact was found with ID ${contactId}`));
  }
  next();
};
