const express = require('express');
const router = express.Router();
const flixCtrl = require('../controllers/flix');

router.get('/', flixCtrl.index);
router.get('/new', flixCtrl.newFlix);
router.post('/new', flixCtrl.create);
router.delete('/:id', flixCtrl.delete);

module.exports = router;
