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

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` and include associated Product data
  const tagData = await Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: Product }],
  }).catch((err => {
    req.status(404).json(err);
  }));
  res.status(200).json(tagData);
});

router.post('/', async (req, res) => {
  // create a new tag
  const tagData = await Tag.create(req.body).catch((err) => {
    res.status(400).json(err);
  });
  res.status(200).json(tagData);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    res.status(400).json(err);
  });
  res.json(tagData);
});

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
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
