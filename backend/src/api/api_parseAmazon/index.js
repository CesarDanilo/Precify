const express = require('express');
const router = express.Router();

const parseAmazon = require('../../util/parseAmazonProduct');

router.get('/fetchAmazon', parseAmazon);

module.exports = router;