const express = require('express');
const router = express.Router();
const api_usuarios = require('../api/api_usuarios');
const api_planos = require('../api/api_planos');

router.use('/usuarios', api_usuarios);
router.use('/planos', api_planos);

module.exports = router;    