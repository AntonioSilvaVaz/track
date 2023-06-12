import './App.css';
import TopBar from './TopBar/TopBar';
import LeftBar from './LeftBar/LeftBar';
import Flow from './Flow/Flow';

import { connectInitialItems, giveInitialItems } from './utils/FlowUtils';
import { useNodesState, useEdgesState } from "reactflow";
import { useEffect, useState } from 'react';
import Render from './Render/Render';

function App() {

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/info`)
      .then(res => res.json())
      .then(data => {
        if (data[0]) {
          try {
            const nodes = giveInitialItems(data[0].items);
            const edges = connectInitialItems(data[0].conections);
            setNodes(nodes);
            setEdges(edges);
          } catch (error) {
            return error;
          }

        }
      })
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [saved, setSaved] = useState('');

  const [showExport, setShowExport] = useState(false);


  return (
    <main className='App'>

      {showExport && <Render setShowExport={setShowExport} />}

      <nav className='TopBar'>
        <TopBar saved={saved} setSaved={setSaved} edges={edges} />
      </nav>

      <section className='LeftBar'>
        <LeftBar setNodes={setNodes} setShowExport={setShowExport} />
      </section>

      <section className='Flow'>
        <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} setEdges={setEdges} setNodes={setNodes} />
      </section>

    </main>
  );
}

export default App;
