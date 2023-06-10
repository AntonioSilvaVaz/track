const router = require('express').Router();
const controller = require('./controller/controller');

router.get('/info', controller.getInformation);
router.post('/save', controller.saveInformation);
router.get('*', controller.notFound);

module.exports = router;