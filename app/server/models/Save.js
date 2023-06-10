const mongoose = require('./connection');

const itemSchema = new mongoose.Schema({
  id: String,
  background_color: String,
  positionX: Number,
  positionY: Number,
  text: String,
  type: String
});

const SaveSchema = new mongoose.Schema({
  items: [itemSchema]
});

const Save = mongoose.model('info', SaveSchema);

async function getInfo() {
  const info = await Save.find({});
  return info;
};

// SAVES AN ARRAY AT ITEMS PART OF THE DB COLLECTION

async function saveInfo(information) {

  const item = information.map(item => ({
    id: item.id,
    background_color: item.background_color,
    positionX: item.position.x + '',
    positionY: item.position.y + '',
    text: item.text,
    type: item.type
  }));

  let document = await Save.find({});

  if (document.length > 0) document.items = item;
  else document = await Save.create({ items: item });

  return document;
}

module.exports = {
  getInfo,
  saveInfo
}