import { MouseEvent, useState, useContext } from "react";
import { createNewProject } from "../../utils/ProjectUtils";
import { DashboardContext } from "../../Context/context";
import "./CreateProject.css";

function CreateProject() {

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] =  useState<string>('');
  const { setShowCreateProject, setProjects } = useContext(DashboardContext);

  function createProject(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    createNewProject(title, description, {setProjects, setTitle, setDescription, setShowCreateProject})
  }

  return (
    <div id="CreateProject">
      <div className='options'>
        <button className='close' onClick={() => setShowCreateProject(false)}>
          <h3>X</h3>
        </button>

        <div className='input-options'>
          <h3>Title:</h3>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="track" />
        </div>

        <div className='input-options'>
          <h3>Description:</h3>
          <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="track is nice" />
        </div>

        <div className='input-options'>
          <button className="create" onClick={createProject}>
            <h3>Create Project</h3>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateProject;