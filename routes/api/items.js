const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch (() => res.json({ msg: 'bad this'}));
});

// @route   POST api/items
// @desc    Create a Post
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save()
    .then(item => { res.json(item) })
    .catch (() => res.json({ msg: 'bad this'}));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove()
    .catch (() => res.json({ msg: 'bad this'}))
    .then(() => res.json(item)))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;