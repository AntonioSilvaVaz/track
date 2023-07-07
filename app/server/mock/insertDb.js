const Save = require('./connection');
const fs = require("fs");

return (async () => {

  const data = await fs.readFileSync(__dirname + '/mockData.json', 'utf-8');
  const parsed = JSON.parse(data);

  const newUser = await Save.create({
    user_email: "demo@demo.com",
    password: "123",
    projects: parsed,
  });

  console.log(newUser);
  process.exit();
})()
