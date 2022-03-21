const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth, unauthorizedError } = require('../../utils/auth');
const { Party, Drop } = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

// Get all parties that the current user belongs to
router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const parties = await Party.find({ memberIds: { $in: user.id } });

  const data = parties.reduce((accum, party) => {
    accum[party.id] = party.toJSON();
    return accum;
  }, {});

  res.json(data);
}));

// Create a new party, making the current user as party leader automatically
router.post('/', asyncHandler(async (req, res) => {
  const { user } = req;
  const { name, memberIds } = req.body;

  const party = await Party.create({ name, leaderId: user.id, memberIds });
  const data = await Party.findById(party.id);

  res.json(data);
}));

// Update a party
router.put('/:id', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { name, memberIds } = req.body;

  const party = await Party.findById(id);

  if (party.leaderId.toString() !== user.id) return next(unauthorizedError);

  if (name) party.name = name;
  if (memberIds) party.memberIds = memberIds;

  await party.save();

  res.json(party);
}));

// Delete a party
router.delete('/:id', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  const party = await Party.findById(id);

  if (party.leaderId.toString() !== user.id) return next(unauthorizedError);

  await party.remove();

  res.json(party);
}));

// Create a new drop for a party
router.post('/:id/drops', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const {
    bossName,
    itemName,
    image,
    memberIds,
  } = req.body;

  const party = await Party.findById(id);

  if (party.leaderId.toString() !== user.id) return next(unauthorizedError);

  const drop = await Drop.create({
    partyId: party.id,
    bossName,
    itemName,
    image,
    members: memberIds.map(memberId => ({ userId: memberId })),
  });
  const data = await Drop.findById(drop.id);

  res.json(data);
}));

// Split party member invite/removal from party edit later
// router.post('/:id/members', asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { memberId } = req.body;

//   const party = await Party.findById(id);

//   party.members.push(memberId);

//   await party.save();

//   res.json(party);
// }));

// router.delete('/:partyId/members/:memberId', asyncHandler(async (req, res) => {
//   const { partyId, memberId } = req.params;

//   const party = await Party.findById(partyId);

//   party.members.pull(memberId);

//   await party.save();

//   res.json(party);
// }));

module.exports = router;
