import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional if using Google OAuth
  image: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    label: String,
    street: String,
    city: String,
    zipCode: String,
    country: String
  }]
}, { timestamps: true });

export const User = models.User || model('User', UserSchema);
