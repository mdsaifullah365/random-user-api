const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/user.controller');

router.route('/random').get(userControllers.getRandomUser);
router.route('/all').get(userControllers.getAllUser);


module.exports = router;