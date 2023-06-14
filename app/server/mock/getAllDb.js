const Save = require('./connection');

return (async()=>{
  const allData = await Save.findOne({});
  console.log(allData);
  process.exit();
})();