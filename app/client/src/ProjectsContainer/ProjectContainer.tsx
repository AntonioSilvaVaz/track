import ProjectCreated from "../ProjectsCreated/ProjectsCreated";
import "./ProjectContainer.css";

function ProjectContainer(props: any) {

  const { projects, setCurrentProjectId, setShowCreateProject, setProjectTitle } = props;

  function loadFlow(title: string, id: string) {
    setCurrentProjectId(id);
    setProjectTitle(title);
    setShowCreateProject(true);
  }

  const allProjects = projects.map((project: { title: string, description: string, _id: string }, index: number) => {
    return (
      <div key={index} onDoubleClick={() => loadFlow(project.title, project._id)}>
        < ProjectCreated title={project.title} description={project.description} />
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