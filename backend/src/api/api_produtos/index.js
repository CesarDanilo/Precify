const express = require('express');
const router = express.Router();
const getProdutos = require('../../controllers/Produtos/getProdutos');
const postProdutos = require('../../controllers/Produtos/postProdutos');
const deleteProdutos = require('../../controllers/Produtos/deleteProdutos');
const updateProdutos = require('../../controllers/Produtos/updateProdutos');

router.get('/getProdutos', getProdutos);
router.post('/postProdutos', postProdutos);
router.delete('/deleteProdutos/:id', deleteProdutos);
router.put('/updateProdutos/:id', updateProdutos);

module.exports = router;