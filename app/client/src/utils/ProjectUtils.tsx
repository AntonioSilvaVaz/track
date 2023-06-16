import { SetStateAction } from "react";
import { initialProject } from "../types";
// THE USER ID IS PASSED ALWAYS IN THE COOKIES
// THE PROJECT ID IS ALSO PASSED IN THE COOKIES WHEN NEEDED

// CREATES A NEW PROJECT
export async function createNewProject(title: string, description: string, setters: any) {

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/project`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description })
  });
  const data = await res.json();

  const {setProjects, setTitle, setDescription, setShowCreateProject} = setters;

  setProjects((currProjects: [initialProject]) => {
    const newProj = {title, description, _id: data._id}
    setTitle('');
    setDescription('');
    setShowCreateProject(false);
    return [...currProjects, newProj];
  });

  return data;
}

// DELETE A PROJECT
export async function deleteProject(project_id: string) {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/project`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ project_id })
  });

  const data = await res.json();
  return data
}

// GETS ALL OF THE PROJECTS THAT THE USER HAS

export async function getAllProjects(setProjects: SetStateAction<any>) {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/projects`, {
    credentials: 'include',
  });

  const data = await res.json();
  setProjects(data);
  return;
}