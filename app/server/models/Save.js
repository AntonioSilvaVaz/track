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
  banner: String,
  items: [itemSchema],
  conections: [conectionchema],
})

const SaveSchema = new mongoose.Schema({
  user_email: String,
  password: String,
  projects: [projectsSchema],
});

const Save = mongoose.model('info', SaveSchema);

async function getInfo(user_id, project_id) {
  let document = await Save.findOne({ _id: user_id });
  let project = document.projects.filter((item) => item._id == project_id);
  return project;
};

// SAVES AN ARRAY AT ITEMS PART OF THE DB COLLECTION

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

  const conections = information[1].map(item => ({
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
    project[0].conections = conections;
    project[0].banner = banner;
    await document.save();
  } else {
    project[0] = {
      items,
      conections,
      banner
    };

    await document.save();
  }


  return document;
}

async function getProj(user_id) {
  let document = await Save.findOne({ _id: user_id });
  return document.projects;
}

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
}

async function deleteProj(user_id, project_id) {
  let document = await Save.findOne({ _id: user_id });
  const allProjects = document.projects;
  document.projects = allProjects.filter((project) => project._id != project_id);
  await document.save();
  return document;
}

async function loginUser({ email, password }) {
  const document = await Save.find({ user_email: email });
  if (!document[0]) return false;
  if (document[0].password == password) return document[0]._id;
  else return false;
}

async function registerUser({ email, password }) {

  const document = await Save.find({ user_email: email });
  if (!document[0]) {
    const newUser = await Save.create({
      user_email: email,
      password,
      projects: [],
    });
    return newUser;
  }
  else return false;


}

async function logUserOut(user_id) {
  return;
  // STILL NEED TO CREATE IT WITH A SEESION TOKEN
}

module.exports = {
  getInfo,
  saveInfo,
  createProj,
  getProj,
  deleteProj,
  registerUser,
  loginUser,
  logUserOut
}