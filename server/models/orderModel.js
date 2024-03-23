import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    priority: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: [pizzaSchema],
      required: true,
    },
    position: String,
    estimatedDelivery: Date,
    orderPrice: Number,
    priorityPrice: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
