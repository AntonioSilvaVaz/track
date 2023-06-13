export function createNewProject(title: string, description: string) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/project`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  });
}

export function deleteProject(project_id: string) {
  return fetch(`${process.env.REACT_APP_BASE_URL}/project`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ project_id, user_id: "648749d95aeb8afb07c57725" })
  });
}

export async function getAllProjects() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/projects`, {
    credentials: 'include',
  });
}