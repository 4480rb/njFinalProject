const express=require("express");
const router=express.Router();
var Products1Controller = require('../controller/Products1Controller.js');


router.get('/',Products1Controller.getAll);


router.get('/:id', Products1Controller.getProductById);

router.post('/', Products1Controller.addProductToDb);

router.delete('/:id', Products1Controller.deleteProduct);

router.put('/:id', Products1Controller.updateProduct);

module.exports = router;

