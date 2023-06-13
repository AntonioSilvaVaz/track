import ProjectCreated from "../ProjectsCreated/ProjectsCreated";
import "./ProjectContainer.css";

function ProjectContainer(props: any) {

  const { projects, setCurrentProjectId, setShowCreateProject, setProjectTitle, setProjects } = props;

  const allProjects = projects.map((project: { title: string, description: string, _id: string }, index: number) => {

    return (
      <div key={index} className="options-container hover">
        < ProjectCreated
         projects={projects} setProjects={setProjects}
        title={project.title} description={project.description} _id={project._id}
        setCurrentProjectId={setCurrentProjectId} setProjectTitle={setProjectTitle} setShowCreateProject={setShowCreateProject}
         />
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