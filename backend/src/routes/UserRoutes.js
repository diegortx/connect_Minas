const express = require('express');
const router = express.Router();



const UserController = require('../controller/UserController');
const UserValidation = require('../middlewares/UserValidation');

router.post('/create', UserValidation, UserController.create);

router.put('/update/:id', UserValidation, UserController.update);

router.get('/:id', UserController.update);

router.get('/filter/all', UserController.all);

router.delete('/:id', UserController.delete);

router.put('/:id', UserController.done);


module.exports = router;