const router = require('express').Router();
const routes = require('require-directory')(module);

Object.entries(routes).forEach(([key, route]) => {
  router.use(`/${key}`, route);
});

module.exports = router;
