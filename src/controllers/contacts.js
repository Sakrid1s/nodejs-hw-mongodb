import createHttpError from 'http-errors';

import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFitlerParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const allContacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  return res.status(200).json({
    status: 200,
    message: 'Successfully found all contacts!',
    data: allContacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, `No contact was found with id ${contactId}`));
    return;
  }
  return res.status(200).json({
    status: 200,
    message: `Successfully found a contact!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const { body, file } = req;

  if (!file || !file.path) {
    return res.status(400).json({
      status: 400,
      message: 'File is missing or invalid',
    });
  }

  const contact = await createContact({ ...body, photo: file }, req.user._id);

  return res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { body, file } = req;

  if (!file || !file.path) {
    return res.status(400).json({
      status: 400,
      message: 'File is missing or invalid',
    });
  }

  const contact = await patchContact(contactId, body, file, req.user._id);
  if (!contact) {
    next(createHttpError(404, `No contact was found with id ${contactId}`));
    return;
  }

  return res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, `No contact was found with id ${contactId}`));
    return;
  }
  res.sendStatus(204);
};
