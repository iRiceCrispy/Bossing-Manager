const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const partiesRouter = require('./parties.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/parties', partiesRouter);

module.exports = router;
