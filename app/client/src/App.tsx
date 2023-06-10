import './App.css';
import TopBar from './TopBar/TopBar';
import LeftBar from './LeftBar/LeftBar';
import Flow from './Flow/Flow';

import { conectItems } from './types';
import { connectInitialItems, giveInitialItems } from './utils/FlowUtils';
import { useNodesState, useEdgesState } from "reactflow";
import { useEffect, useState } from 'react';

function App() {

  const initialEdges: conectItems[] = connectInitialItems();

  useEffect(() => {
    fetch('http://localhost:3001/info')
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          const init = giveInitialItems(data)
          setNodes(init);
        }
      })
  }, [])

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  return (
    <div className='App'>

      <div className='TopBar'>
        <TopBar />
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
