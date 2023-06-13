import { useState } from 'react';
import './App.css';
import InProjects from './InProjects/InProjects';
import Dashboard from './Dashboad/Dashboard';
import Login from './Login/Login';
import { Context } from './Context/context';

function App() {

  const [loggedIn, setLoggedIn]: [boolean, any] = useState(false);
  const [showProject, setShowProject]: [boolean, any] = useState(false);
  const [title, setProjectTitle]: [string, any] = useState('Track');

  const value = { loggedIn, setLoggedIn, showProject, setShowProject, title, setProjectTitle }

  return (
    <Context.Provider value={value}>
      <main className='App'>
        {loggedIn ?
          showProject ?
            <InProjects />
            : <Dashboard />
          :
          <Login />
        }

      </main>
    </ Context.Provider >
  );
}

export default App;
