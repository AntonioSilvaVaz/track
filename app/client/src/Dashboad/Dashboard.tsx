import { useEffect, useState } from "react";
import DashboardBar from "../DashboardBar/DashboardBar";
import ProjectsContainer from "../ProjectsContainer/ProjectContainer";
import "./Dashboard.css";
import CreateProject from "../CreateProject/CreateProject";
import { getAllProjects } from "../utils/ProjectUtils";
import { logout } from "../utils/LoginUtils";

function Dashboard({ setShowProject, setProjectTitle, setLoggedIn }: any) {

  const [projects, setProjects]: [{ title: string, description: string, id: string, banner: string }[], any] = useState([]);
  const [showCreateProject, setShowCreateProject]: [boolean, any] = useState(false);

  useEffect(() => {
    getAllProjects()
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.log(err))
  }, []);

  function loguserOut() {
    logout()
      .then(res => setLoggedIn(false))
      .catch(err => console.log(err))
  }

  return (
    <div id="dashboard">
      {showCreateProject && <CreateProject setShowCreateProject={setShowCreateProject} setProjects={setProjects} />}
      <DashboardBar title={'Dashboard'} rightText={'Logout'} callback={loguserOut} />
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