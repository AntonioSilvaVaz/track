const mongoose = require('./connection');

const itemSchema = new mongoose.Schema({
  background_color: String,
  positionX: String,
  positionY: String,
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
// THIS DOSEN'T WORK IT DOSEN'T SAVE THE INFORMATION INTO THE DB
// ONLY THE ARRAY BUT IT SAVES IT WITH NOTHING

async function saveInfo(information) {

  const item = information.map(item => ({
    background_color: item.background_color,
    positionX: item.position.x + '',
    positionY: item.position.y + '',
    text: item.text,
    type: item.text
  }));

  const saved = await Save.create({
    item: [
      {
        background_color: 'test',
        positionX: 'test',
        positionY: 'test',
        text: 'test',
        type: 'test'
      },
    ]
  });
  return saved;
}

module.exports = {
  getInfo,
  saveInfo
}