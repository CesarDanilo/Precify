const express = require('express');
const router = express.Router();
const getFavoritos = require('../../controllers/Favoritos/getFavoritos');
const postFavoritos = require('../../controllers/Favoritos/postFavoritos');
const deleteFavoritos = require('../../controllers/Favoritos/deleteFavoritos');
const updateFavoritos = require('../../controllers/Favoritos/updateFavoritos');

router.get('/getFavoritos', getFavoritos);
router.post('/postFavoritos', postFavoritos);
router.delete('/deleteFavoritos/:id', deleteFavoritos);
router.put('/updateFavoritos/:id', updateFavoritos);

module.exports = router;