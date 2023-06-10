const mongoose = require('./connection');

const itemSchema = new mongoose.Schema({
  id: String,
  text_color: String,
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

  const items = information.map(item => ({
    id: item.id,
    text_color: item.text_color,
    background_color: item.background_color,
    positionX: item.position.x + '',
    positionY: item.position.y + '',
    text: item.text,
    type: item.type
  }));

  let document = await Save.findOne({});

  if (document) {
    document.items = items;
    await document.save();
  }
  else document = await Save.create({ items });

  return document;
}

module.exports = {
  getInfo,
  saveInfo
}