import { useContext } from "react"
import { Context, FlowContext } from "../../Context/context";

import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';

import LeftBar from '../../items/LeftBar/LeftBar';
import Flow from '../../items/Flow/Flow';
import './inProjects.css';

import Render from '../Render/Render';
import DashboardBar from "../../items/DashboardBar/DashboardBar";
import { resetItems } from "../../utils/FlowUtils";

function InProjects() {

  const { title, setShowProject } = useContext(Context);

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


  function leaveThisPage() {
    document.cookie = 'project_id=0';
    setShowProject(false);
    resetItems();
  }

  return (
    <FlowContext.Provider value={value}>
      <main className='InProjects'>
        {showExport && <Render />}
        <DashboardBar title={'Dashboard'} extraStyle={{ gridColumn: '1 / 3' }} rightText={title} callback={() => setShowExport(true)} extraCallback={leaveThisPage} />
        <LeftBar />
        <Flow />
      </main>
    </FlowContext.Provider>
  );
}

export default InProjects;
