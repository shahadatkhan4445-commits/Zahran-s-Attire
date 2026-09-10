import mongoose, { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  image: { type: String }
}, { timestamps: true });

export const Category = models.Category || model('Category', CategorySchema);
