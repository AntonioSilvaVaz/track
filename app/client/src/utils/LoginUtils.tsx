// THE CHECK USER FUNCTION SETS THE USER ID COOKIE OF EVEYTHING GOES FINE
export async function checkuser(email: string, password: string) {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  });

  const data = await res.json();
  return Boolean(data);
}

// IT CREATES A NEW USER AND AUTOMATICALY LOGS IT IN
export async function createUser(email: string, password: string) {
  const res = await  fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  });

  const data = await res.json();
  if(Boolean(data)) return await checkuser(email, password);
}

export async function logout() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
    credentials: 'include',
    method: 'DELETE',
  })
}