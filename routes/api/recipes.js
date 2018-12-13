const express = require('express');
const router = express.Router();
const passport = require('passport');

// Recipe model
const Recipe = require('../../models/Recipe');

// Validation
// const validatePostInput = require('../../validation/post');

// @route   GET api/recipes/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: "Recipe Works"
}));

// @route   GET api/recipes
// @desc    Get recipes
// @access  Public
router.get('/', (req, res) => {
    Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json({ norecipefound: 'No recipes found' }));
});
// @route   GET api/recipes/:recipe_id
// @desc    Get recipe by id
// @access  Public
router.get('/:recipe_id', (req, res) => {
  Recipe.findById(req.params.recipe_id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({
      norecipefound: 'No recipe found with that ID'
    }));
});

// @route   POST api/recipes
// @desc    Create recipe
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    debugger
    // const { errors, isValid } = validatePostInput(req.body);

    // Add Validation

    const newRecipe = new Recipe({
      user: req.user.id,
      title: req.body.title,
      mainImage: req.body.mainImage,
      calloutText: req.body.calloutText,
      prepTime: req.body.prepTime,
      totalTime: req.body.totalTime,
      servesText: req.body.servesText,
      ingredients: req.body.ingredients,
      serveWith: req.body.serveWith,
      instructions: req.body.instructions,
      notes: req.body.notes,
      videoURL: req.body.videoURL,
    });

    newRecipe.save().then(recipe => res.json(recipe));
});

// @route   DELETE api/recipes/:recipe_id
// @desc    Delete recipe
// @access  Private
router.delete('/:recipe_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.findById(req.params.recipe_id)
  .then(recipe => {

      // Delete
      recipe.remove().then(() => res.json({ success: true }));
  })
  .catch(err => res.status(404).json({ recipenotfound: 'No recipe found' }));
});

module.exports = router;