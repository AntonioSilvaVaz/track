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

const SaveSchema = new mongoose.Schema({
  items: [itemSchema],
  conections: [conectionchema],
});

const Save = mongoose.model('info', SaveSchema);

async function getInfo() {
  const info = await Save.find({});
  return info;
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

  let document = await Save.findOne({});

  if (document) {
    document.items = items;
    document.conections = conections;
    await document.save();
  } else document = await Save.create({ items, conections });

  return document;
}

async function saveMockData(mockData) {
  try {
    await Save.create({...mockData});
    return 'SUCCESS';
  } catch (error) {
    return 'FAILED' + error;
  }
}

module.exports = {
  getInfo,
  saveInfo,
  saveMockData
}