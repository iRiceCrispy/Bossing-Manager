const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth, unauthorizedError } = require('../../utils/auth');
const { Party } = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

router.get('/', asyncHandler(async (req, res) => {
  const { user } = req;

  const parties = await Party.find({ memberIds: { $in: user.id } });

  const data = parties.reduce((accum, party) => {
    accum[party.id] = party.toJSON();
    return accum;
  }, {});

  res.json(data);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { user } = req;
  const { name, memberIds } = req.body;

  const party = await Party.create({ name, leaderId: user.id, memberIds });
  const data = await Party.findById(party.id);

  res.json(data);
}));

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

router.delete('/:id', asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  const party = await Party.findById(id);

  if (party.leaderId.toString() !== user.id) return next(unauthorizedError);

  await party.remove();

  res.json(party);
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
