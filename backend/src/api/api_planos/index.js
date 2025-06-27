const express = require('express');
const router = express.Router();
const getPlanos = require('../../controllers/Planos/getPlanos');
const postPlanos = require('../../controllers/Planos/postPlanos');
// const deletePlanos = require('../../controllers/Planos/deletePlanos');
// const updatePlanos = require('../../controllers/Planos/updatePlanos');

router.get('/getPlanos', getPlanos);
router.post('/postPlanos', postPlanos);
// router.delete('/deletePlanos/:id', deletePlanos);
// router.put('/updatePlanos/:id', updatePlanos);

module.exports = router;