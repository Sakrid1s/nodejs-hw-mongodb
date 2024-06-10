import mongoose from 'mongoose';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const allContacts = await getAllContacts();
  return res.status(200).json({
    status: 200,
    message: 'Successfully found all contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const isInvalidId = !mongoose.Types.ObjectId.isValid(contactId);
  const contact = isInvalidId ? null : await getContactById(contactId);
  if (isInvalidId || !contact) {
    throw new Error(`No contact was found with id ${contactId}`);
  }
  return res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}`,
    data: contact,
  });
};
