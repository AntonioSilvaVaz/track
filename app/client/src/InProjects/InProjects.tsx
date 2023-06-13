import './inProjects.css';
import TopBar from '../TopBar/TopBar';
import LeftBar from '../LeftBar/LeftBar';
import Flow from '../Flow/Flow';

import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';
import Render from '../Render/Render';

function InProjects({ currentProjectId, setShowProject, title, setCurrentProjectId }: any) {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [saved, setSaved] = useState('');

  const [showExport, setShowExport] = useState(false);

  return (
    <main className='InProjects'>

      {showExport && <Render setShowExport={setShowExport} />}

      <nav className='TopBar'>
        <TopBar
        title={"Dashboard"} page={title} saved={saved} setSaved={setSaved} edges={edges}
        setShowProject={setShowProject} currentProjectId={currentProjectId} setCurrentProjectId={setCurrentProjectId}
        />
      </nav>

      <section className='LeftBar'>
        <LeftBar setNodes={setNodes} setShowExport={setShowExport} />
      </section>

      <section className='Flow'>
        <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange} setEdges={setEdges} setNodes={setNodes}
          currentProjectId={currentProjectId}
        />
      </section>

    </main>
  );
}

export default InProjects;
