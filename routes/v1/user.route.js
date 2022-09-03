const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/user.controller');

router.route('/random').get(userControllers.getRandomUser);
router.route('/all').get(userControllers.getAllUser);
router.route('/save').post(userControllers.saveUser);
router.route('/update').patch(userControllers.updateAUser);

module.exports = router;
