const express = require('express');
const router = express.Router();
const getUsers = require('../../controllers/Usuarios/getUsers');
const postUsers = require('../../controllers/Usuarios/postUsers');
const deleteUsers = require('../../controllers/Usuarios/deleteUsers');
const updateUsers = require('../../controllers/Usuarios/updateUsers');

const validacaoUsuariosExistente = require('../../middlewares/Usuarios/validacaoUsuarioExistente');
const validacaoUsuarioLogin = require('../../middlewares/Usuarios/ValidacaoUsuarioLogin');

router.get('/getUsers', getUsers);
router.post('/postUsers', validacaoUsuariosExistente, postUsers);
router.post('/validationUser', validacaoUsuarioLogin);
router.delete('/deleteUsers/:id', deleteUsers);
router.put('/updateUsers/:id', updateUsers);

module.exports = router;