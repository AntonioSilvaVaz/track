import './App.css';
import TopBar from './TopBar/TopBar';
import LeftBar from './LeftBar/LeftBar';
import Flow from './Flow/Flow';

function App() {
  return (
    <div className='App'>

      <div className='TopBar'>
        <TopBar totalNodes={0} />
      </div>

      <div className='LeftBar'>
        <LeftBar />
      </div>

      <div className='Flow'>
        <Flow />
      </div>

    </div>
  );
}

export default App;
