const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { Party } = require('../../db/models');

const router = express.Router();

router.use(restoreUser);

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const partiesL = await Party.find({ leaderId: user.id });
  const partiesM = await Party.find({ members: { $in: user.id } });

  res.json({ leaderOf: partiesL, memberOf: partiesM });
}));

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req;
  const { name, memberIds } = req.body;

  const party = await Party.create({ name, leaderId: user.id, members: memberIds });

  res.json(party);
}));

router.post('/:id/members', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { memberId } = req.body;

  const party = await Party.findOne({ id });

  party.members.push(memberId);

  await party.save();

  res.json(party);
}));

router.delete('/:partyId/members/:memberId', asyncHandler(async (req, res) => {
  const { partyId, memberId } = req.params;

  const party = await Party.findOne({ id: partyId });

  party.members.pull(memberId);

  await party.save();

  res.json(party);
}));

module.exports = router;
