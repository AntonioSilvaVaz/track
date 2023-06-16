const { saveInfo, getInfo, createProj, getProj, deleteProj} = require('../models/Project');

const saveInformation = async (req, res) => {

  const body = req.body;
  const user_id = req.cookies.user_id;
  const project_id = req.cookies.project_id;

  const saved = await saveInfo(body, user_id, project_id);
  res.body = JSON.stringify(saved);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(res.body);

}

const createProject = async (req, res) => {

  const info = req.body;
  const user_id = req.cookies.user_id;
  const projectCreated = await createProj(info, user_id);

  res.body = JSON.stringify(projectCreated);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(res.body);

}

const deleteProject = async (req, res) => {

  const user_id = req.cookies.user_id;
  const { project_id } = req.body;

  const projectDeleted = await deleteProj(user_id, project_id);
  res.body = JSON.stringify(projectDeleted);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(res.body);
}

const getProjects = async (req, res) => {
  const user_id = req.cookies.user_id;
  const allProjects = await getProj(user_id);
  res.body = JSON.stringify(allProjects);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(res.body);
}

const getInformation = async (req, res) => {

  const user_id = req.cookies.user_id;
  const project_id = req.cookies.project_id;

  const info = await getInfo(user_id, project_id);
  res.body = JSON.stringify(info);

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(res.body);
}

const notFound = (req, res) => {
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.end('Failed');
}

module.exports = {
  saveInformation,
  getInformation,
  notFound,
  createProject,
  getProjects,
  deleteProject,
}