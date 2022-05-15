var express = require('express');
var router = express.Router();
var categorya1Controller = require('../controller/categorya1Controller.js');


router.get('/', categorya1Controller.getAll);

router.get('/:id', categorya1Controller.getCategoryById);

router.post('/', categorya1Controller.addCategory);

router.put('/:id', categorya1Controller.update);

router.delete('/:id', categorya1Controller.delete);

module.exports = router;
