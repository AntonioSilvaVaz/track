import { useState } from 'react';
import './App.css';
import InProjects from './InProjects/InProjects';
import Dashboard from './Dashboad/Dashboard';
import Login from './Login/Login';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [title, setProjectTitle] = useState('Track');

  return (
    <main className='App'>

      {loggedIn ?
        showProject ?
          <InProjects setShowProject={setShowProject} title={title} />
          : <Dashboard setShowProject={setShowProject} setProjectTitle={setProjectTitle} setLoggedIn={setLoggedIn} /> :
        <Login setLoggedIn={setLoggedIn} />
      }

    </main>
  );
}

export default App;
