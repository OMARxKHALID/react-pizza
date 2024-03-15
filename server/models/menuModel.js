import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [ingredientSchema],
      required: true,
    },
    soldOut: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const menuSchema = new mongoose.Schema({
  pizzas: {
    type: [pizzaSchema],
    required: true,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
