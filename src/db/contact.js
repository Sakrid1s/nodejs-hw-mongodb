import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    email: String,
    isFavorite: { type: Boolean, default: false },
    contactType: {
      type: String,
      require: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

export const Contact = model('Contacts', contactSchema);
