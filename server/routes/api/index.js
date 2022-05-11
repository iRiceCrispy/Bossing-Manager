const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const partiesRouter = require('./parties.js');
const dropsRouter = require('./drops.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/parties', partiesRouter);
router.use('/drops', dropsRouter);

module.exports = router;
