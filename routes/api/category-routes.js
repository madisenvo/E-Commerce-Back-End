const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and include associated Products
  const categoryData = await Category.findAll({
    include: [Product, { model: Product }]}).catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(categoryData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value and include associated Products
  const categoryData = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product, {model: Product}],
  }).catch((err => {
    req.status(404).json(err);
  }));
  res.status(200).json(categoryData);
});

router.post('/', async (req, res) => {
  // create a new category
  const categoryData = await Category.create(req.body).catch((err) => {
    res.status(400).json(err);
  });
  res.status(200).json(categoryData);
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    res.status(400).json(err);
  });
  res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id
    },
  }).catch((err) => {
    res.status(404).json(err);
  });
  res.status(200).json(deletedCategory);
});

module.exports = router;
