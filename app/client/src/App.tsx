import { useState } from 'react';
import './App.css';
import InProjects from './InProjects/InProjects';
import Dashboard from './Dashboad/Dashboard';

function App() {

  const [showProject, setShowProject] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState('');
  const [title, setProjectTitle] = useState('Track');

  return (
    <main className='App'>

      {showProject ?
        <InProjects title={title} currentProjectId={currentProjectId} setShowProject={setShowProject} setCurrentProjectId={setCurrentProjectId} />
        : <Dashboard setProjectTitle={setProjectTitle} setShowProject={setShowProject} setCurrentProjectId={setCurrentProjectId} />
      }

    </main>
  );
}

export default App;
