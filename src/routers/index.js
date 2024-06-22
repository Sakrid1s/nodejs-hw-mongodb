import { Router } from 'express';

import contactsRouter from '../routers/contacts.js';
import authRouter from '../routers/auth.js';

const rootRouter = Router();

rootRouter.use('/contacts', contactsRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
