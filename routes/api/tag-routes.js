const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags and include associated Product data
  const tagData = await Tag.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.status(404).json(err);
  });
  res.status(200).json(tagData);
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id
    },
  }).catch((err) => {
    res.status(404).json(err);
  });
  res.status(200).json(deletedTag);
});

module.exports = router;
