const { ItemSchema, ConnectionSchema, ProjectsSchema, Save } = require('./Schemas');

async function checkUser(user_id) {
  let document = await Save.findOne({ _id: user_id });
  if (!document) throw new Error('User not found');
  else return document;
}

async function loginUser(email, password) {
  const document = await Save.find({ user_email: email });
  if (!document[0]) throw new Error('User not found');
  else if (document[0].password == password) return document[0]._id;
  else throw new Error('Wrong password');
}

async function registerUser(email, password) {
  const document = await Save.find({ user_email: email });
  if (!document[0]) {
    const newUser = await Save.create({
      user_email: email,
      password,
      projects: [],
    });
    return newUser;
  }
  else throw new Error('User already exists');
}

async function logUserOut(user_id) {
  let document = await Save.findOne({ _id: user_id });
  if (!document) throw new Error("User doesn't exist");
  else return 'Logout';
}

module.exports = {
  checkUser, loginUser, registerUser, logUserOut,
}