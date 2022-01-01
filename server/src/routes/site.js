const express = require('express');
const router = express.Router();
const SiteController = require('../controller/siteController');

router.get('/', SiteController.index);
router.post('/signup', SiteController.signup);

module.exports = router;
