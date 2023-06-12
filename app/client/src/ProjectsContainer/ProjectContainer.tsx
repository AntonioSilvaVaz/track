import ProjectCreated from "../ProjectsCreated/ProjectsCreated";
import { useState } from "react";
import "./ProjectContainer.css";

function ProjectContainer(props: any) {

  const { projects } = props;

  const allProjects = projects.map((project: {title: string, description: string}) => {
    return <ProjectCreated title={project.title} description={project.description} />;
  })

  return (
    <section id="ProjectContainer">
      {allProjects}
    </section>
  )
}

export default ProjectContainer;