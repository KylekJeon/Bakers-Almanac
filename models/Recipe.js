const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecipeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  mainImage: String,
  calloutText: String,
  prepTime: String,
  totalTime: String,
  servesText: String,
  ingredients: [String],
  serveWith: [String],
  instructions: [String],
  notes: [String],
  videoURL: String
})

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);