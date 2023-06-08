import './App.css';
import TopBar from './TopBar/TopBar';
import LeftBar from './LeftBar/LeftBar';
import Flow from './Flow/Flow';

import { nodeType } from './types';
import { getAllitems, connectInitialItems } from './utils/FlowUtils';
import { useNodesState, useEdgesState } from "reactflow";

function App() {

  const initialNodes: nodeType[] = getAllitems();
  const initialEdges = connectInitialItems();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className='App'>

      <div className='TopBar'>
        <TopBar totalNodes={0} />
      </div>

      <div className='LeftBar'>
        <LeftBar setNodes={setNodes} />
      </div>

      <div className='Flow'>
        <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange} setEdges={setEdges} />
      </div>

    </div>
  );
}

export default App;
