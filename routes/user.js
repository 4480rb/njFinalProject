const express = require('express');
const router = express.Router();
 const controller= require('../Controller/userMongooseController');
// // const controller= require('../Controller/mongoDb');
router.get('/', controller.getAllUsers);

router.get('/:id', controller.getUserById);

router.get('/:name/:password', controller.getUserByNameAndPassword);

router.post('/', controller.addUserToDb);

 router.delete('/:id', controller.deleteUser);

 router.put('/:id', controller.updateUser);

module.exports = router;


