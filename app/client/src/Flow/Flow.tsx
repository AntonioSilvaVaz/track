import { useCallback } from "react";
import ReactFlow, { addEdge } from "reactflow";
import 'reactflow/dist/style.css';
import './Flow.css';

function Flow(props: any) {

  const { nodes, edges, onNodesChange, onEdgesChange, setEdges } = props;

  // CHECK https://reactflow.dev/docs/quickstart/
  // BEFORE LOOKING TO THIS CODE


  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges]);


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />

    </div>
  )
}

export default Flow;