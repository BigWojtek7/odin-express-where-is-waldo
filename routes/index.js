const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/scores');
});

module.exports = router;
