const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const partiesRouter = require('./parties');
const dropsRouter = require('./drops');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/parties', partiesRouter);
router.use('/drops', dropsRouter);

module.exports = router;
