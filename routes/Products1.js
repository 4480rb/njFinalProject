var express = require('express');
var router = express.Router();
var Products1Controller = require('../controller/Products1Controller.js');


router.get('/', Products1Controller.getAll);

router.get('/',Products1Controller.getAlldes);

router.get('/:id', Products1Controller.getProductByCategory);

router.post('/', Products1Controller.addProductToDb);

router.delete('/:id', Products1Controller.deleteProduct);

router.put('/:id', Products1Controller.updateProduct);


module.exports = router;
