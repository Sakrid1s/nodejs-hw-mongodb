import mongoose from 'mongoose';
import { getAllContacts, getContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const allContacts = await getAllContacts();
  return res.status(200).json({
    status: 200,
    message: 'Successfully found all contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const isInvalidId = !mongoose.Types.ObjectId.isValid(contactId);
  const contact = isInvalidId ? null : await getContactById(contactId);
  if (isInvalidId || !contact) {
    next(createHttpError(404, `No contact was found with id ${contactId}`));
    return;
  }
  return res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};
