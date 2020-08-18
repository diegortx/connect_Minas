const express = require('express');
const router = express.Router();


const AuthController = require('../controller/AuthController');
const AuthVerify = require('../middlewares/AuthVerify')

router.post('/login/:email/:password', AuthController.login);
router.get('/users', AuthVerify, AuthController.users);

router.get('/me/:token', AuthVerify, AuthController.me)



module.exports = router;