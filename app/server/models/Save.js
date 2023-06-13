const mongoose = require('./connection');

const itemSchema = new mongoose.Schema({
  id: String,
  text_color: String,
  background_color: String,
  positionX: Number,
  positionY: Number,
  text: String,
  type: String,
  file: String,
});

const conectionchema = new mongoose.Schema({
  sourceId: String,
  targetId: String,
  sourceHandle: String,
  targetHandle: String,
});

const projectsSchema = new mongoose.Schema({
  title: String,
  description: String,
  items: [itemSchema],
  conections: [conectionchema],
})

const SaveSchema = new mongoose.Schema({
  projects: [projectsSchema],
});

const Save = mongoose.model('info', SaveSchema);

async function getInfo({ user_id, project_id }) {
  let document = await Save.findOne({ _id: user_id });
  let project = document.projects.filter((item) => item._id == project_id);
  return project;
};

// SAVES AN ARRAY AT ITEMS PART OF THE DB COLLECTION

async function saveInfo(information) {

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

  const conections = information[1].map(item => ({
    sourceId: item.sourceId,
    targetId: item.targetId,
    sourceHandle: item.sourceHandle,
    targetHandle: item.targetHandle,
  }));

  const { user_id, project_id } = information[2];

  let document = await Save.findOne({ _id: user_id });
  let project = document.projects.filter((item) => item._id == project_id);

  if(project[0]){
    project[0].items = items;
    project[0].conections = conections;
    await document.save();
  } else {
    project[0] = {
      items,
      conections
    };

    await document.save();
  }


  return document;
}

async function getProj({ user_id }) {
  // let document = await Save.findOne({ _id: user_id });
  let document = await Save.find({});
  return document;
}

async function createProj(info) {

  const { title, description, user_id } = info;

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

  return document;
}

async function saveMockData(mockData) {
  try {
    await Save.create({ ...mockData });
    return 'SUCCESS';
  } catch (error) {
    return 'FAILED' + error;
  }
}

async function deleteProj({ project_id, user_id }) {
  let document = await Save.findOne({ _id: user_id });
  const allProjects = document.projects;
  document.projects = allProjects.filter((project) => project._id != project_id);
  await document.save();
  return document;
}

module.exports = {
  getInfo,
  saveInfo,
  saveMockData,
  createProj,
  getProj,
  deleteProj
}