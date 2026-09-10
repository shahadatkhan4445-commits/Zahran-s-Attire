import mongoose, { Schema, model, models } from 'mongoose';

const OrderItemSchema = new Schema({
  product: { type: String, required: true },
  name: String,
  price: Number,
  quantity: Number,
  color: String,
  size: String
});

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional for guest checkout
  guestEmail: String,
  guestName: String,
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  },
  paymentMethod: { type: String, enum: ['COD', 'SSLCommerz', 'bKash', 'Nagad'], default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' }
}, { timestamps: true });

export const Order = models.Order || model('Order', OrderSchema);
