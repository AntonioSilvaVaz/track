const { saveMockData } = require("../models/Save");
const fs = require('fs');

return (async () => {
  const data = await fs.readFileSync(__dirname + '/mockData.json', 'utf-8');
  const json = JSON.parse(data)
  const res = await saveMockData(json);
  process.exit();
})()