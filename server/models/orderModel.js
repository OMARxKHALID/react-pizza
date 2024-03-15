import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
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
    position: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: true,
    },
    estimatedDelivery: {
      type: Date,
      required: false,
    },
    orderPrice: {
      type: Number,
      required: false,
    },
    priorityPrice: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
