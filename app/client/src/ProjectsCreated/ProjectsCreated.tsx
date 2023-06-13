import bg from "../images/white_bg.png";
import "./ProjectsCreated.css"
import { deleteProject } from "../utils/ProjectUtils";

function ProjectsCreated({
  title, description, projects, setProjects,
  _id, setShowCreateProject, setProjectTitle, banner
}: any) {

  const imgSrc = banner ? banner : bg;


  function deleteElement(e: any) {
    e.preventDefault();
    deleteProject(_id)
      .then(res => {
        const newArr = projects.filter((project: { _id: string }) => project._id !== _id);
        setProjects(newArr)
      });
  }

  function loadFlow() {
    document.cookie = `project_id=${_id}`;
    setProjectTitle(title);
    setShowCreateProject(true);
  }


  return (
    <div className="project hover"
      onContextMenu={deleteElement}
      onClick={loadFlow}>
      <img src={imgSrc} alt="Banner" />
      <h3 className="title">{title}</h3>
    </div >
  )
}

export default ProjectsCreated;