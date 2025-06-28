const express = require('express');
const router = express.Router();
const api_usuarios = require('../api/api_usuarios');
const api_planos = require('../api/api_planos');
const api_produtos = require('../api/api_produtos');

router.use('/usuarios', api_usuarios);
router.use('/planos', api_planos);
router.use('/produtos', api_produtos);

module.exports = router;    