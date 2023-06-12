export function createNewProject(title: string, description: string, setProjects: any) {
  setProjects((currProjects: { title: string, description: string }[]) => {
    return [...currProjects, { title, description }];
  });
}

export async function getAllProjects() {
  return fetch(`${process.env.REACT_APP_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: "648749d95aeb8afb07c57725" })
  });
}