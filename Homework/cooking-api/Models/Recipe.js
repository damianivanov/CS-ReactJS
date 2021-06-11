const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 80,
    },
    description: {
      type: String,
      max: 2048,
    },
    short_description: {
      type: String,
      max: 256,
    },
    time: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
