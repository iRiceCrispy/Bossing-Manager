const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth, unauthorizedError } = require('../../utils/auth');
const { Drop } = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

const validateDrop = [
  check('bossName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a boss.'),
  check('itemName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter an item.'),
  check('image')
    .custom(image => {
      if (!image.length || image.endsWith('.jpg') || image.endsWith('.jpeg') || image.endsWith('.png')) {
        return true;
      }

      throw new Error('Only images with extentions .png, .jpg, and .jpeg are accepted.');
    }),
  check('memberIds')
    .isArray({ min: 2 })
    .withMessage('Please include at least 2 members in the party, including yourself.')
    .isArray({ max: 6 })
    .withMessage('There cannot be more than 6 members in a party.'),
  handleValidationErrors,
];

// Get all drops that the current user belongs to
router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const drops = await Drop.find({ members: { $in: { userId: user.id } } });

  const data = drops.reduce((accum, drop) => {
    accum[drop.id] = drop.toJSON();
    return accum;
  }, {});

  res.json(data);
}));

// Update a drop
router.put('/:id', validateDrop, asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const {
    bossName,
    itemName,
    image,
    memberIds,
  } = req.body;

  const drop = await Drop.findById(id).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  drop.bossName = bossName;
  drop.itemName = itemName;
  drop.image = image;
  drop.members = memberIds.map(memberId => ({ userId: memberId }));

  await drop.save();

  res.json(drop);
}));

// Delete a drop
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  const drop = await Drop.findById(id).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  await drop.remove();

  res.json(drop);
}));

module.exports = router;
