const express = require('express');
const router = express.Router();

const score_controller = require('../controllers/scoreController');

/* GET scores listing. */
router.get('/', score_controller.all_scores_get);

router.post('/score', score_controller.score_save_post);

module.exports = router;
