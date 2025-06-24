const express = require('express');
const router = express.Router();
const api_usuarios = require('../api/api_usuarios');

router.use('/usuarios', api_usuarios); 

module.exports = router;    