const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const {
  Drop, Party,
} = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const drops = await Drop.find({ members: { user: user.id } });

  res.json(drops);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req;
  const {
    bossName,
    itemName,
    image,
    saleImage,
    members,
  } = req.body;

  const party = await Party.find({ leaderId: user.id });
  const drop = await Drop.create({
    partyId: party.id, bossName, itemName, image, saleImage, members,
  });

  res.json(drop);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const {
    bossName,
    itemName,
    image,
    saleImage,
    members,
  } = req.body;

  const drop = await Drop.findById(id).populate('party');

  if (drop.party.leaderId !== user.id) return res.status(401).json({ error: 'Unauthorized' });

  if (bossName) drop.bossName = bossName;
  if (itemName) drop.itemName = itemName;
  if (image) drop.image = image;
  if (saleImage) drop.saleImage = saleImage;
  if (members) drop.members = members;

  await drop.save();

  res.json(drop);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Drop.deleteOne({ id });

  res.json({ message: 'Sucessfully deleted drop.' });
}));

module.exports = router;
