import { useContext } from "react";
import { DashboardContext } from "../Context/context";

import ProjectCreated from "../ProjectsCreated/ProjectsCreated";
import "./ProjectContainer.css";
import { initialProject } from "../types";

function ProjectContainer() {

  const { projects, setProjects } = useContext(DashboardContext);

  const allProjects = projects.map((project: initialProject, index: number) => {

    return (
      <div key={index} className="options-container hover">
        < ProjectCreated  banner={project.banner} title={project.title} description={project.description} _id={project._id}/>
      </div>
    )
  })

  return (
    <section id="ProjectContainer">
      {allProjects}
    </section>
  )
}

export default ProjectContainer;