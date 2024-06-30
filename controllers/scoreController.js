const Score = require('../models/score');
const { body, validationResult } = require('express-validator');

exports.all_scores_get = async (req, res, next) => {
  try {
    const allScores = await Score.find().sort({ time: 1 }).exec();
    res.json(allScores);
  } catch (err) {
    next(err);
  }
};
exports.score_save_post = [
  body('username', 'Username must be 3-15 characters')
    .trim()
    .isLength({ min: 3, max: 15 })
    .escape(),
  body('time').trim().escape(),

  async (req, res) => {
    const errors = validationResult(req);

    const score = new Score({
      username: req.body.username,
      time: req.body.time,
    });
    if (!errors.isEmpty()) {
      return res.json(errors.array());
    } else {
      await score.save();
      res.json({ success: true, msg: 'The score has been saved' });
    }
  },
];
