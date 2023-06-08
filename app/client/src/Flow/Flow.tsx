import { useCallback } from "react";
import ReactFlow, { addEdge, useNodesState, useEdgesState } from "reactflow";

import { handleNodeClick } from "../utils/FlowUtils";
import 'reactflow/dist/style.css';
import './Flow.css';

function Flow(props: any) {

  const { nodes, edges, onNodesChange, onEdgesChange, setEdges, setCurrentText } = props;

  // CHECK https://reactflow.dev/docs/quickstart/

  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges]);


  return (
    <div style={{ width: '100%', height: '100%' }}>

      <ReactFlow
        onNodeClick={(event, node) => handleNodeClick(setCurrentText, node)}

        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >

      </ReactFlow>

    </div>
  )
}

export default Flow;