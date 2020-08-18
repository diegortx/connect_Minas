const express = require('express');
const router = express.Router();

const OsController = require('../controller/OsController');
const OsValidation = require('../middlewares/OsValidation');

router.post('/create', OsValidation, OsController.create);

router.put('/update/:id', OsValidation, OsController.update);

router.get('/:id', OsController.show);

router.get('/filter/all/:user_id',  OsController.all);
router.get('/filter/late/:user_id',  OsController.late);
router.get('/filter/today/:user_id',  OsController.today);
router.get('/filter/week/:user_id',  OsController.week);
router.get('/filter/month/:user_id',  OsController.month);
router.get('/filter/year/:user_id',  OsController.year);

router.delete('/:id', OsController.delete);

router.put('/:id/:done', OsController.done);

module.exports = router;