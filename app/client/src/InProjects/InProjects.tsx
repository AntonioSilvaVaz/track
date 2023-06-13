import { useContext } from "react"
import { Context, FlowContext } from "../Context/context";

import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';

import TopBar from '../TopBar/TopBar';
import LeftBar from '../LeftBar/LeftBar';
import Flow from '../Flow/Flow';
import './inProjects.css';

import Render from '../Render/Render';

function InProjects() {

  const { title } = useContext(Context);

  const [showExport, setShowExport] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [saved, setSaved] = useState('');

  const value = {
    nodes: [], setNodes: (node: any) => { }, onNodesChange: () => { },
    edges: [], setEdges: (edge: any) => { }, onEdgesChange: () => { },
    saved: '', setSaved: (value: string) => { },
    showExport: false, setShowExport: ()=>{}
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
