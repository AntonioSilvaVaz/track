const { loginUser, registerUser, logUserOut,checkUser,} = require('../models/User');

// LOGINS THE USER AND SETS A USER ID COOKIE WITH 1 MOTH OF VALIDATY
const login = async (req, res) => {

  const {email, password} = req.body;

  if(!email || !password){
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Not enough information');
  } else{
    try {
      const info =  await loginUser(email, password);
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      res.setHeader('Set-Cookie', `user_id=${info}; expires=${expirationDate.toUTCString()}; path=/`);
      res.writeHead(200, { 'Content-Type': 'text/plain'});
      res.end('Loged in');
    } catch (error) {
      console.log(error);
      res.writeHead(409, {'Content-Type': 'text/plain'});
      res.end('Failed login');
    }
  }

}

// REGISTERS THE USER
const register = async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Not enough information');
  } else{
    try {
      const data =  await registerUser(email, password);
      res.writeHead(200, { 'Content-Type': 'text/plain'});
      res.end('Registered');
    } catch (error) {
      res.writeHead(409, {'Content-Type': 'text/plain'});
      res.end('Already Registered');
    }
  }
}

// LOGS THE USER OUT AND DELETES THE USER ID COOKIE, AND THE SESSION ID
const logout = async (req, res) => {
  const user_id = req.cookies.user_id;
  if(!user_id){
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
  } else{
    try {
      await logUserOut(user_id);
      res.setHeader('Set-Cookie', 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Unauthorized');
    } catch (error) {
      res.setHeader('Set-Cookie', 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/');
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Unauthorized');
    }

  }
}

// CONFIRMS THAT THE USER ID SENT IS VALID
const confirmUser = async (req, res) => {
  const user_id = req.cookies.user_id;
  if (!user_id) {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
  } else {
    try {
      await checkUser(user_id);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Autorized');
    } catch (error) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Unauthorized');
    }
  }
}

module.exports = {
  login,
  register,
  logout,
  confirmUser
}