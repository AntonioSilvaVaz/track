import { SetStateAction, useContext } from "react"
import { Context, FlowContext } from "../../Context/context";

import { useNodesState, useEdgesState } from "reactflow";
import { useState } from 'react';

import LeftBar from '../../items/LeftBar/LeftBar';
import Flow from '../../items/Flow/Flow';
import './inProjects.css';

import Render from '../Render/Render';
import DashboardBar from "../../items/DashboardBar/DashboardBar";
import { resetItems } from "../../utils/FlowUtils";
import { saveFile } from "../../utils/SaveUtils";

function InProjects() {

  const { title, setShowProject }: { title: string, setShowProject: SetStateAction<any> } = useContext(Context);

  const [showExport, setShowExport]: [boolean, any] = useState(false);
  const [nodes, setNodes, onNodesChange]: [any, SetStateAction<any>, any] = useNodesState([]);
  const [edges, setEdges, onEdgesChange]: [any, SetStateAction<any>, any] = useEdgesState([]);
  const [saved, setSaved]: [string, SetStateAction<any>] = useState('');

  const value = {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    saved, setSaved,
    showExport, setShowExport
  }


  async function extraCallback() {
    await saveFile(edges)
    document.cookie = 'project_id=0';
    setShowProject(false);
    resetItems();
  }

  return (
    <FlowContext.Provider value={value}>
      <main className='InProjects'>
        {showExport && <Render projectName={title} />}
        <DashboardBar title={'Dashboard'} extraStyle={{ gridColumn: '1 / 3' }} rightText={title} callback={() => setShowExport(true)} extraCallback={extraCallback} />
        <LeftBar />
        <Flow />
      </main>
    </FlowContext.Provider>
  );
}

export default InProjects;
