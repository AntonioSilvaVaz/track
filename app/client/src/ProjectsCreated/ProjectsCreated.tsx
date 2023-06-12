import cat from "../images/cat.jpg";
import "./ProjectsCreated.css"

function ProjectsCreated({title, description}: any) {
  return (
    <div className="project">
      <img src={cat} alt="Cat" />
      <h3>{title}</h3>
    </div>
  )
}

export default ProjectsCreated;