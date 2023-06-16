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

async function checkUser(user_id) {
  let document = await Save.findOne({ _id: user_id });
  if (!document) throw new Error;
  else return document;
}

async function loginUser(email, password) {
  const document = await Save.find({ user_email: email });
  if (!document[0]) throw new Error;
  else if (document[0].password == password) return document[0]._id;
  else throw new Error;
}

async function registerUser(email, password) {
  const document = await Save.find({ user_email: email });
  if (!document[0]) {
    const newUser = await Save.create({
      user_email: email,
      password,
      projects: [],
    });
    return newUser;
  }
  else throw new Error;
}

async function logUserOut(user_id) {
  let document = await Save.findOne({ _id: user_id });
  if (!document) throw new Error;
  else return 'Logout';
  // STILL NEED TO CREATE IT WITH A SEESION TOKEN
}

module.exports = {
  checkUser, loginUser, registerUser, logUserOut,
  Save
}