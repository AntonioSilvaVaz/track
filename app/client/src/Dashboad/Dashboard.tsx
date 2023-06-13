import { useEffect, useState } from "react";
import DashboardBar from "../DashboardBar/DashboardBar";
import ProjectsContainer from "../ProjectsContainer/ProjectContainer";
import "./Dashboard.css";
import CreateProject from "../CreateProject/CreateProject";
import {  getAllProjects } from "../utils/ProjectUtils";

function Dashboard({ setCurrentProjectId, setShowProject, setProjectTitle }: any) {

  const [projects, setProjects]: [{ title: string, description: string, id: string }[], any] = useState([]);
  const [showCreateProject, setShowCreateProject]: [boolean, any] = useState(false);

  useEffect(() => {
    getAllProjects()
      .then(res => res.json())
      .then(data => setProjects(data[0].projects))
      .catch(err => alert('Failed Fetching Data'))
  }, []);

  return (
    <div id="dashboard">
      {showCreateProject && <CreateProject setShowCreateProject={setShowCreateProject} setProjects={setProjects} />}
      <DashboardBar />
      <ProjectsContainer projects={projects}
        setCurrentProjectId={setCurrentProjectId} setShowCreateProject={setShowProject}
        setProjectTitle={setProjectTitle} setProjects={setProjects}
      />
      <button className='create-btn' onClick={() => setShowCreateProject(true)}>
        <h2>+</h2>
      </button>
    </div>
  )
}

export default Dashboard;