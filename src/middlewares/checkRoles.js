import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;

    if (roles.includes('admin') && user.role === 'admin') {
      next();
      return;
    }

    if (roles.includes('user') && user.role === 'user') {
      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });
      if (!contact) {
        next(createHttpError(403, 'This is not your contact'));
        return;
      }
      next();
      return;
    }
    next(createHttpError(403, 'Forbidden'));
    return;
  };
