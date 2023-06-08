import './App.css';
import TopBar from './TopBar/TopBar';
import LeftBar from './LeftBar/LeftBar';
import Flow from './Flow/Flow';

import { nodeType } from './types';
import { getAllitems, connectInitialItems } from './utils/FlowUtils';
import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';

function App() {

  const initialNodes: nodeType[] = getAllitems();
  const initialEdges = connectInitialItems();

  const [currentText, setCurrentText] = useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className='App'>

      <div className='TopBar'>
        <TopBar totalNodes={0} currentText={currentText} setCurrentText={setCurrentText} nodes={nodes} setNodes={setNodes} />
      </div>

      <div className='LeftBar'>
        <LeftBar setNodes={setNodes} />
      </div>

      <div className='Flow'>
        <Flow nodes={nodes} setNodes={setNodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} setEdges={setEdges} setCurrentText={setCurrentText} />
      </div>

    </div>
  );
}

export default App;
