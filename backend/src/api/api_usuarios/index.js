const express = require('express');
const router = express.Router();
const getUsers = require('../../controllers/Usuarios/getUsers');
const postUsers = require('../../controllers/Usuarios/postUsers');

router.get('/getUsers', getUsers);
router.post('/postUsers', postUsers);

module.exports = router;