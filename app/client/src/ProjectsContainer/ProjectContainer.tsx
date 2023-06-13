import { useContext } from "react";
import { DashboardContext, Context } from "../Context/context";

import ProjectCreated from "../ProjectsCreated/ProjectsCreated";
import "./ProjectContainer.css";

function ProjectContainer() {

  const { projects } = useContext(DashboardContext);

  const allProjects = projects.map((project: { title: string, description: string, _id: string, banner: string }, index: number) => {

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