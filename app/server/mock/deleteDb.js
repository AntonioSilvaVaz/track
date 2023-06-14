const Save = require('./connection');

return (async()=>{
  const allData = await Save.deleteMany({});
  console.log(allData);
  process.exit();
})();