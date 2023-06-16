const router = require('express').Router();
const ProjectController = require('./controllers/ProjectController');
const UserController = require('./controllers/UserController');

// USER ROUTES
router.get('/confirm', UserController.confirmUser);
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.delete('/logout', UserController.logout);

// PROJECT ROUTES
router.get('/info', ProjectController.getInformation);
router.get('/projects', ProjectController.getProjects);
router.post('/project', ProjectController.createProject);
router.post('/save', ProjectController.saveInformation);
router.delete('/project', ProjectController.deleteProject);

router.get('*', ProjectController.notFound);

module.exports = router;