import { SetStateAction } from "react";

// THE CHECK USER FUNCTION SETS THE USER ID COOKIE OF EVEYTHING GOES FINE
export async function loginUser(email: string, password: string) {

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
    credentials: 'include',
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (res.ok) return true;
  else return false;
}

// IT CREATES A NEW USER AND AUTOMATICALY LOGS IT IN
export async function createUser(email: string, password: string) {

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
    const newUser = await loginUser(email, password);
    return newUser;
  }
}

// LOGS THE USER OUT
export async function logout(setLoggedIn: SetStateAction<any>) {
  // if(cookies[0] && cookies[0] === )
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, { credentials: 'include', method: 'DELETE', });
  if (res.ok) setLoggedIn(false)
  else alert('Failed logout');
}

// CHECKS ID THE USER IS LOGGED IN
export async function checkIfUserIsLoggedIn(setLoggedIn: SetStateAction<any>) {
  const cookies = document.cookie.split(';');
  if (cookies[0].match(/user_id/)) {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/confirm`, { credentials: 'include', });
    if (res.ok) setLoggedIn(true);
  }

}