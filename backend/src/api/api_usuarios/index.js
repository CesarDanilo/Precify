const express = require('express');
const router = express.Router();
const getUsers = require('../../controllers/Usuarios/getUsers');

router.get('/getUsers', getUsers);

module.exports = router;