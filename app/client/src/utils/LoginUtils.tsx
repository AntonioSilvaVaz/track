export async function checkuser(email: string, password: string) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })
}

export async function createUser(email: string, password: string) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })
}