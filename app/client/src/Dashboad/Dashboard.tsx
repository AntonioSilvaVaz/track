import { useEffect, useState } from "react";
import DashboardBar from "../DashboardBar/DashboardBar";
import ProjectsContainer from "../ProjectsContainer/ProjectContainer";
import "./Dashboard.css";
import CreateProject from "../CreateProject/CreateProject";
import {  getAllProjects } from "../utils/ProjectUtils";

function Dashboard({ setShowProject, setProjectTitle }: any) {

  const [projects, setProjects]: [{ title: string, description: string, id: string }[], any] = useState([]);
  const [showCreateProject, setShowCreateProject]: [boolean, any] = useState(false);

  useEffect(() => {
    getAllProjects()
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div id="dashboard">
      {showCreateProject && <CreateProject setShowCreateProject={setShowCreateProject} setProjects={setProjects} />}
      <DashboardBar />
      <ProjectsContainer projects={projects}
        setShowCreateProject={setShowProject}
        setProjectTitle={setProjectTitle} setProjects={setProjects}
      />
      <button className='create-btn' onClick={() => setShowCreateProject(true)}>
        <h2>+</h2>
      </button>
    </div>
  )
}

export default Dashboard;