const express = require('express');
const router = express.Router();
const checkJwt = require('./authMiddleware');
//dont mind yhis for now
router.get('/profile', checkJwt, (req, res) => {
  res.json({
    message: 'This is a secured route',
    user: req.user,
  });
});

module.exports = router;
