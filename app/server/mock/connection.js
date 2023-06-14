const mongoose = require('mongoose');

(async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/track');
})();

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

module.exports = Save;