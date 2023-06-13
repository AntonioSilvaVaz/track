import { useContext } from "react";
import { DashboardContext, Context } from "../Context/context";

import bg from "../images/white_bg.png";
import "./ProjectsCreated.css"
import { deleteProject } from "../utils/ProjectUtils";

function ProjectsCreated({ title, description, _id, banner }: any) {

  const { projects, setProjects } = useContext(DashboardContext);
  const { setProjectTitle, setShowProject } = useContext(Context);
  const imgSrc = banner ? banner : bg;

  function deleteElement(e: any) {
    e.preventDefault();
    deleteProject(_id)
      .then(res => setProjects(projects.filter((project: { _id: string }) => project._id !== _id)));
  }

  function loadFlow() {
    document.cookie = `project_id=${_id}`;
    setProjectTitle(title);
    setShowProject(true);
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