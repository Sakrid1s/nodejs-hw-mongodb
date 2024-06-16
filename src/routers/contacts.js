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
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactValidationSchema } from '../validations/createContactValidationSchema.js';
import { updateContactValidationSchema } from '../validations/updateContactValidationSchema.js';

const router = Router();

router.use('/contacts/:contactId', validateMongoId('contactId'));

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
