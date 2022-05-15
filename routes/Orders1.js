var express = require('express');
var router = express.Router();
var Orders1Controller = require('../controller/Ordres1Controller');


router.get('/', Orders1Controller.getAll);

router.get('/:id', Orders1Controller.getOrderById);

router.post('/', Orders1Controller.addOrderToDb);

router.delete('/:id', Orders1Controller.deleteOrder);

router.put('/:id', Orders1Controller.updateOrder);


module.exports = router;