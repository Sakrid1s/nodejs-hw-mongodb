import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactValidationSchema } from '../validations/createContactValidationSchema.js';
import { updateContactValidationSchema } from '../validations/updateContactValidationSchema.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { upload } from '../middlewares/uploadImage.js';

const contactsRouter = Router();

contactsRouter.use('/:contactId', validateMongoId('contactId'));

contactsRouter.use('/', authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/:contactId',
  // checkRoles('user', 'admin'),
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  // validateBody(createContactValidationSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  // checkRoles('user', 'admin'),
  upload.single('photo'),
  // validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  // checkRoles('user', 'admin'),
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
