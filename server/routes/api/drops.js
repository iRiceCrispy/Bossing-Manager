const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth, unauthorizedError } = require('../../utils/auth');
const { Party, Drop } = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

const validateDrop = [
  check('bossName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid boss.'),
  check('itemName')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid item.'),
  check('image')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Please provid a valid URL')
    .bail()
    .custom((image) => {
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

const validateSale = [
  check('price')
    .isInt({ min: 0 })
    .withMessage('Price must be a non-negative number.'),
  check('saleImage')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Please provid a valid URL')
    .bail()
    .custom((image) => {
      if (!image.length || image.endsWith('.jpg') || image.endsWith('.jpeg') || image.endsWith('.png')) {
        return true;
      }

      throw new Error('Only images with extentions .png, .jpg, and .jpeg are accepted.');
    }),
  handleValidationErrors,
];

// Get all drops that the current user belongs to
router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const parties = await Party.find({ leaderId: user.id });

  const drops = await Drop.find({
    $or: [
      { members: { $elemMatch: { userId: user.id } } },
      { partyId: { $in: parties.map(party => party.id) } },
    ],
  });

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

// Marking drop as sold
router.post('/:id/sale', validateSale, asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { price, saleImage } = req.body;

  const drop = await Drop.findById(id).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  drop.sold = true;
  drop.price = price;
  drop.saleImage = saleImage;

  await drop.save();

  res.json(drop);
}));

// Update sale
router.put('/:id/sale', validateSale, asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { price, saleImage } = req.body;

  const drop = await Drop.findById(id).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  drop.sold = true;
  drop.price = price;
  drop.saleImage = saleImage;

  await drop.save();

  res.json(drop);
}));

// Delete sale
router.delete('/:id/sale', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  const drop = await Drop.findById(id).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  drop.sold = false;
  delete drop.price;
  delete drop.saleImage;
  drop.members.forEach((member) => {
    member.isPaid = false;
  });

  await drop.save();

  res.json(drop);
}));

// Mark member payment
router.post('/:dropId/members/:memberId/payment', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { dropId, memberId } = req.params;

  const drop = await Drop.findById(dropId).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  const member = drop.members.find(mem => mem.userId.toString() === memberId);

  member.isPaid = true;

  await drop.save();

  res.json(drop);
}));

// Unmark member payment
router.delete('/:dropId/members/:memberId/payment', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { dropId, memberId } = req.params;

  const drop = await Drop.findById(dropId).populate('party');

  if (drop.party.leaderId.toString() !== user.id) return next(unauthorizedError);

  const member = drop.members.find(mem => mem.userId.toString() === memberId);

  member.isPaid = false;

  await drop.save();

  res.json(drop);
}));

module.exports = router;
