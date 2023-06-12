const {saveInfo, getInfo, createProj} = require('../models/Save');

const saveInformation = async (req, res) => {

  const body = req.body;
  const saved = await saveInfo(body);
  res.body = JSON.stringify(saved);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);

}

const createProject = async (req, res) => {

  const info = req.body;
  const projectCreated = await createProj(info);

  res.body = JSON.stringify(projectCreated);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);

}

const getInformation = async (req, res) => {

  const info = await getInfo(req.body);
  res.body = JSON.stringify(info);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);
}

const notFound = (req, res) => {

  res.writeHead(404, {
    'Content-Type': 'application/json'
  })

  res.end('Failed');
}

module.exports = {
  saveInformation,
  getInformation,
  notFound,
  createProject
}