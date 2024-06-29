const Score = require('..models/score');
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
  body('username', 'username is required').trim().isLength({ min: 3 }).escape(),
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
      res.json('Score saved');
    }
  },
];
