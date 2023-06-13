import cat from "../images/cat.jpg";
import "./ProjectsCreated.css"
import { deleteProject } from "../utils/ProjectUtils";
import React, { useState } from "react";

function ProjectsCreated({
  title, description, projects, setProjects,
  _id, setShowCreateProject, setCurrentProjectId, setProjectTitle
}: any) {


  function loadOptionsMenu(e: React.MouseEvent<HTMLElement>, setShowOptions: any) {
    // IN THIS CASE PREVENTS CRHOME FROM OPENING THE PANEL
    e.preventDefault();
    setShowOptions(true);
  }

  function deleteElement() {
    deleteProject(_id)
      .then(res => {
        const newArr = projects.filter((project: { _id: string }) => project._id !== _id);
        setProjects(newArr)
      });
  }

  function loadFlow() {
    setShowOptions(false)
    setCurrentProjectId(_id);
    setProjectTitle(title);
    setShowCreateProject(true);
  }

  const [showOptions, setShowOptions]: [boolean, any] = useState(false)

  return (
    <div className="project hover">
      <div
        onContextMenu={(e) => loadOptionsMenu(e, setShowOptions)}
        onClick={loadFlow}
      >
        <img src={cat} alt="Cat" />
        <h3 className="title">{title}</h3>
      </div>
      {showOptions &&
        <div className="options hover">
          <h3 onClick={deleteElement}>Delete</h3>
        </div>
      }
    </div >
  )
}

export default ProjectsCreated;