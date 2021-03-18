const express = require('express');
const router = express.Router();
const flixCtrl = require('../controllers/flix');
router.get('/', flixCtrl.index);
router.get('/new', flixCtrl.newFlix);
router.post('/new', flixCtrl.create);
router.get('/:id', flixCtrl.show);
router.delete('/:id', flixCtrl.delete);
router.get('/rando', flixCtrl.randomFlix)
module.exports = router;