import {useContext} from "react"
import { Context } from "../Context/context";

import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';

import TopBar from '../TopBar/TopBar';
import LeftBar from '../LeftBar/LeftBar';
import Flow from '../Flow/Flow';
import './inProjects.css';

import Render from '../Render/Render';

function InProjects() {

  const { setShowProject, title } = useContext(Context);

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
        setShowProject={setShowProject}
        />
      </nav>

      <section className='LeftBar'>
        <LeftBar setNodes={setNodes} setShowExport={setShowExport} />
      </section>

      <section className='Flow'>
        <Flow nodes={nodes} edges={edges} onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange} setEdges={setEdges} setNodes={setNodes}

        />
      </section>

    </main>
  );
}

export default InProjects;
