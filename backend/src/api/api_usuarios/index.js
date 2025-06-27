const express = require('express');
const router = express.Router();
const getUsers = require('../../controllers/Usuarios/getUsers');
const postUsers = require('../../controllers/Usuarios/postUsers');

const validacaoUsuariosExistente = require('../../middlewares/Usuarios/validacaoUsuarioExistente')

router.get('/getUsers', getUsers);
router.post('/postUsers', validacaoUsuariosExistente, postUsers);

module.exports = router;