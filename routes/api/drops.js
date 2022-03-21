const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth, unauthorizedError } = require('../../utils/auth');
const { Drop } = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

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
router.put('/:id', asyncHandler(async (req, res, next) => {
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

  if (bossName) drop.bossName = bossName;
  if (itemName) drop.itemName = itemName;
  if (image) drop.image = image;
  if (memberIds) drop.members = memberIds.map(memberId => ({ userId: memberId }));

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
