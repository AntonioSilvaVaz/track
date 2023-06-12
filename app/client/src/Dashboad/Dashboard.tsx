import { useState } from "react";
import DashboardBar from "../DashboardBar/DashboardBar";
import ProjectsContainer from "../ProjectsContainer/ProjectContainer";
import "./Dashboard.css";
import CreateProject from "../CreateProject/CreateProject";

function Dashboard() {

  const [projects, setProjects]: [{description: string , img?: string}[], any] = useState([]);
  const [showCreateProject, setShowCreateProject]: [boolean, any] = useState(false);

  return (
    <div id="dashboard">
      {showCreateProject && <CreateProject setShowCreateProject={setShowCreateProject} setProjects={setProjects}/>}
      <DashboardBar />
      <ProjectsContainer projects={projects} />
      <button className='create-btn' onClick={() => setShowCreateProject(true)}>
        <h2>+</h2>
        </button>
    </div>
  )
}

export default Dashboard;