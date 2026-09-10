import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  variants: [{
    color: String,
    size: String,
    stock: { type: Number, default: 0 }
  }],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false }
}, { timestamps: true });

export const Product = models.Product || model('Product', ProductSchema);
