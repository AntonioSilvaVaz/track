import { useState } from 'react';
import './App.css';
import InProjects from './InProjects/InProjects';
import Dashboard from './Dashboad/Dashboard';

function App() {

  const [showProject, setShowProject] = useState(false);

  return (
    <main className='App'>

      {showProject ? <InProjects /> : <Dashboard />}

    </main>
  );
}

export default App;
