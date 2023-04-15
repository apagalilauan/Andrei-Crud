const express = require('express');
const router = express.Router();
const Item = require('../model/item_model');

router.get('/', (req, res) => {
  Item.find().then(items => {
    res.json(items);
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
});

router.get('/:id', (req, res) => {
  Item.findById(req.params.id).then(item => {
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
});

router.post('/', (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    dimensions: req.body.dimensions,
    color: req.body.color,
    material: req.body.material,
    imageUrl: req.body.imageUrl,
    stock: req.body.stock,
    tags: req.body.tags,
  });
  item.save().then(savedItem => {
    res.json(savedItem);
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
});

router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }, { new: true }).then(item => {
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
});

router.delete('/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id).then(item => {
    if (item) {
      res.json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });
});

module.exports = router;
