import { useEffect, useState, useContext } from "react";
import { Context, DashboardContext } from "../Context/context";
import "./Dashboard.css";

import DashboardBar from "../DashboardBar/DashboardBar";
import ProjectsContainer from "../ProjectsContainer/ProjectContainer";
import CreateProject from "../CreateProject/CreateProject";

import { getAllProjects } from "../utils/ProjectUtils";
import { logout } from "../utils/LoginUtils";

function Dashboard() {

  const { setLoggedIn } = useContext(Context);

  const [projects, setProjects]: [{ title: string, description: string, _id: string, banner: string }[], any] = useState([]);
  const [showCreateProject, setShowCreateProject]: [boolean, any] = useState(false);
  const value = { projects, setProjects, showCreateProject, setShowCreateProject };

  useEffect(() => {
    getAllProjects()
      .then(data => setProjects(data))
  }, []);

  function logUserOut() {
    logout()
      .then(res => setLoggedIn(false))
      .catch(err => alert('Failed logout'))
  }

  return (
    <DashboardContext.Provider value={value}>
      <section id="dashboard">
        {showCreateProject && <CreateProject />}
        <DashboardBar title={'Dashboard'} rightText={'Logout'} callback={logUserOut} />
        <ProjectsContainer />
        <button className='create-btn' onClick={() => setShowCreateProject(true)}>
          <h2>+</h2>
        </button>
      </section>
    </ DashboardContext.Provider >
  )
}

export default Dashboard;