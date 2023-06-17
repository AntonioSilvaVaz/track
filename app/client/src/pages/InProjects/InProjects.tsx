import { useContext } from "react"
import { Context, FlowContext } from "../../Context/context";

import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';

import TopBar from '../../items/TopBar/TopBar';
import LeftBar from '../../items/LeftBar/LeftBar';
import Flow from '../../items/Flow/Flow';
import './inProjects.css';

import Render from '../Render/Render';

function InProjects() {

  const { title } = useContext(Context);

  const [showExport, setShowExport]: [any, any] = useState(false);
  const [nodes, setNodes, onNodesChange]: [any, any, any] = useNodesState([]);
  const [edges, setEdges, onEdgesChange]: [any, any, any] = useEdgesState([]);
  const [saved, setSaved]: [any, any] = useState('');

  const value = {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    saved, setSaved,
    showExport, setShowExport
  }
  return (
    <FlowContext.Provider value={value}>
      <main className='InProjects'>

        {showExport && <Render/>}

        <nav className='TopBar'>
          <TopBar page={title}/>
        </nav>

        <section className='LeftBar'>
          <LeftBar />
        </section>

        <section className='Flow'>
          <Flow/>
        </section>

      </main>
    </FlowContext.Provider>
  );
}

export default InProjects;
