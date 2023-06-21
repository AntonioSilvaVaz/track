import { useEffect, useState, useContext } from "react";
import { Context, DashboardContext } from "../../Context/context";
import "./Dashboard.css";

import DashboardBar from "../../items/DashboardBar/DashboardBar";
import ProjectsContainer from "../../items/ProjectsContainer/ProjectContainer";
import CreateProject from "../CreateProject/CreateProject";

import { getAllProjects } from "../../utils/ProjectUtils";
import { logout } from "../../utils/AuthUtils";
import { initialProject } from "../../types";

function Dashboard() {

  const { setLoggedIn } = useContext(Context);

  const [projects, setProjects] = useState<initialProject[]>([]);
  const [showCreateProject, setShowCreateProject] = useState<boolean>(false);
  const value = { projects, setProjects, showCreateProject, setShowCreateProject };

  useEffect(() => {
    getAllProjects(setProjects)
  }, []);

  function logUserOut() {
    logout(setLoggedIn);
  }

  return (
    <DashboardContext.Provider value={value}>
      <section id="dashboard">
        {showCreateProject && <CreateProject />}
        <DashboardBar title={'Dashboard'} rightText={'Logout'} callback={logUserOut} />
        <ProjectsContainer />
        <div className="btn-container">
          <button className='create-btn' onClick={() => setShowCreateProject(true)}>
            <h2>New project</h2>
          </button>
        </div>
      </section>
    </ DashboardContext.Provider >
  )
}

export default Dashboard;