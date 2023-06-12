import './App.css';
import TopBar from './TopBar/TopBar';
import LeftBar from './LeftBar/LeftBar';
import Flow from './Flow/Flow';

import { connectInitialItems, giveInitialItems } from './utils/FlowUtils';
import { useNodesState, useEdgesState } from "reactflow";
import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:3001/info')
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          const nodes = giveInitialItems(data[0].items);
          const edges = connectInitialItems(data[0].conections);
          setNodes(nodes);
          setEdges(edges);
        }
      })
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [saved, setSaved] = useState('');


  return (
    <div className='App'>

      <div className='TopBar'>
        <TopBar saved={saved} setSaved={setSaved} edges={edges} />
      </div>

      <div className='LeftBar'>
        <LeftBar setNodes={setNodes} />
      </div>

      <div className='Flow'>
        <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} setEdges={setEdges} setNodes={setNodes} />
      </div>

    </div>
  );
}

export default App;
