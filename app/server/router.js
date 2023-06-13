const router = require('express').Router();
const controller = require('./controller/controller');

router.get('/info', controller.getInformation);
router.get('/projects', controller.getProjects);

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/project', controller.createProject);

router.delete('/project', controller.deleteProject);

router.post('/save', controller.saveInformation);
router.get('*', controller.notFound);

module.exports = router;