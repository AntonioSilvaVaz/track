const { Save } = require('./Schemas');

// GETS A INFORMATION OF AN X PROJECT
async function getInfo(user_id, project_id) {
  let document = await Save.findOne({ _id: user_id });
  let project = document.projects.filter((item) => item._id == project_id);
  return project;
};

// SAVES ALL OF THE INFORMATION OF AN X PROJECT
async function saveInfo(information, user_id, project_id) {

  const items = information[0].map(item => ({
    id: item.id,
    text_color: item.text_color,
    background_color: item.background_color,
    positionX: item.positionX,
    positionY: item.positionY,
    text: item.text,
    type: item.type,
    file: item.img
  }));

  const connections = information[1].map(item => ({
    sourceId: item.sourceId,
    targetId: item.targetId,
    sourceHandle: item.sourceHandle,
    targetHandle: item.targetHandle,
  }));

  const banner = information[2].banner;

  let document = await Save.findOne({ _id: user_id });
  let project = document.projects.filter((item) => item._id == project_id);

  if (project[0]) {
    project[0].items = items;
    project[0].connections = connections;
    project[0].banner = banner;
    await document.save();
  } else {
    project[0] = {
      items,
      connections,
      banner
    };

    await document.save();
  }


  return document;
};

// GETS ALL OF THE USER PROJECTS
async function getProj(user_id) {
  let document = await Save.findOne({ _id: user_id });
  return document.projects;
};

// CREATES A NEW PROJECT
async function createProj(info, user_id) {

  const { title, description } = info;

  let document = await Save.findOne({ _id: user_id });
  const newProject = {
    title,
    description,
    items: [],
    connections: [],
  }

  const allProjects = document.projects;
  document.projects = [...allProjects, newProject];
  await document.save();

  const returnEl = document.projects[document.projects.length - 1];
  return returnEl;
};

// DELETES A CERTAIN PROJECT
async function deleteProj(user_id, project_id) {
  let document = await Save.findOne({ _id: user_id });
  const allProjects = document.projects;
  document.projects = allProjects.filter((project) => project._id != project_id);
  await document.save();
  return document;
};


module.exports = {
  getInfo,
  saveInfo,
  createProj,
  getProj,
  deleteProj,
}