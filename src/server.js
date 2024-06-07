import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { MONGO_VARS } from './constants/constants.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = env(MONGO_VARS.PORT);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const allContacts = await getAllContacts();
      return res.status(200).json({
        status: '200',
        message: 'Successfully found contacts!',
        data: allContacts,
      });
    } catch (error) {
      return res.status(500).json({
        status: '500',
        message: 'Failed to get contacts',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(contactId)) {
        throw new Error('contact ID is not valid');
      }
      const contact = await getContactById(contactId);
      return res.status(200).json({
        status: '200',
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      return res
        .status(404)
        .json({ status: '404', message: 'Not found', error: error.message });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      err: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
