import { ChangeEvent, useState } from "react";
import "./CreateProject.css";
import { createNewProject } from "../utils/ProjectUtils";

function CreateProject({ setShowCreateProject, setProjects }: any) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function creatseProject(e: any) {
    e.preventDefault();
    createNewProject(title, description, setProjects);
    setTitle('');
    setDescription('');
    setShowCreateProject(false);
  }

  return (
    <div id="CreateProject">
      <div className='options'>
        <button className='close' onClick={() => setShowCreateProject(false)}>
          <h3>X</h3>
        </button>

        <div className='input-options'>
          <h3>Title:</h3>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="ex: track" />
        </div>

        <div className='input-options'>
          <h3>Description:</h3>
          <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="ex: track is nice" />
        </div>

        <div className='input-options'>
          <button className="create" onClick={creatseProject}>
            <h3>Create Project:</h3>
          </button>
        </div>


      </div>
    </div>
  )
}

export default CreateProject;