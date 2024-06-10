import mongoose from 'mongoose';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  try {
    const allContacts = await getAllContacts();
    return res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: allContacts,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Failed to get contacts',
      error: error.message,
    });
  }
};

export const getContactByIdController = async (req, res) => {
  try {
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
  } catch (error) {
    return res
      .status(404)
      .json({ status: '404', message: 'Not found', error: error.message });
  }
};
