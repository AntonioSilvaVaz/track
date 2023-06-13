const { saveInfo, getInfo, createProj, getProj, deleteProj, loginUser, registerUser, logUserOut } = require('../models/Save');

const saveInformation = async (req, res) => {

  const body = req.body;
  const user_id = req.cookies.user_id;
  const project_id = req.cookies.project_id;

  const saved = await saveInfo(body, user_id, project_id);
  res.body = JSON.stringify(saved);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);

}

const createProject = async (req, res) => {

  const info = req.body;
  const user_id = req.cookies.user_id;
  const projectCreated = await createProj(info, user_id);

  res.body = JSON.stringify(projectCreated);

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);

}

const deleteProject = async (req, res) => {

  const user_id = req.cookies.user_id;
  const project_id = req.cookies.project_id;

  const projectDeleted = await deleteProj(user_id, project_id);
  res.body = JSON.stringify(projectDeleted);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);
}

const getProjects = async (req, res) => {
  const user_id = req.cookies.user_id;
  const allProjects = await getProj(user_id);
  res.body = JSON.stringify(allProjects);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(res.body);
}

const getInformation = async (req, res) => {

  const user_id = req.cookies.user_id;
  const project_id = req.cookies.project_id;

  const info = await getInfo(user_id, project_id);
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

const login = async (req, res) => {

  const info = await loginUser(req.body);

  if (!info) {
    res.body = JSON.stringify('Already Exists');
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });
    res.end('false');
  } else {
    res.setHeader('Set-Cookie', `user_id=${info}`);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end('true');
  }

}

const register = async (req, res) => {
  const info = await registerUser(req.body);

  if (!info) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end('false');
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end('true');
  }

}

const logout = async (req, res) => {
  const user_id = req.cookies.user_id;
  await logUserOut(user_id);
  res.setHeader('Set-Cookie', `user_id=0`);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('true');
}

module.exports = {
  saveInformation,
  getInformation,
  notFound,
  createProject,
  getProjects,
  deleteProject,
  login,
  register,
  logout
}