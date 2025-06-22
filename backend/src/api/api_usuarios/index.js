const getUsers = require('../../controllers/Usuarios/getUsers');
const express = require('express');
const router = express.Router();

router.get('/getUsers', getUsers);

module.exports = router;