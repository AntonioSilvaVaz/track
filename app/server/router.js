const router = require('express').Router();
const controller = require('./controller/controller');

router.post('/info', controller.getInformation);

router.post('/projects', controller.getProjects);
router.post('/project', controller.createProject);
router.delete('/project', controller.deleteProject);

router.post('/save', controller.saveInformation);
router.get('*', controller.notFound);

module.exports = router;