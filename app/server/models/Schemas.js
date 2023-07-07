require('dotenv');
const mongoose = require('./connection');

const ItemSchema = new mongoose.Schema({
  id: String,
  text_color: String,
  background_color: String,
  positionX: Number,
  positionY: Number,
  text: String,
  type: String,
  file: String,
});

const ConnectionSchema = new mongoose.Schema({
  sourceId: String,
  targetId: String,
  sourceHandle: String,
  targetHandle: String,
});

const ProjectsSchema = new mongoose.Schema({
  title: String,
  description: String,
  banner: String,
  items: [ItemSchema],
  connections: [ConnectionSchema],
})

const SaveSchema = new mongoose.Schema({
  user_email: String,
  password: String,
  projects: [ProjectsSchema],
});

const Save = mongoose.model('info', SaveSchema);

module.exports = {
  Save
}