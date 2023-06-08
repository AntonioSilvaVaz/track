import { useCallback, useRef } from "react";
import ReactFlow, { addEdge} from "reactflow";

import { handleNodeClick } from "../utils/FlowUtils";
import 'reactflow/dist/style.css';
import './Flow.css';

function Flow(props: any) {

  const { nodes, edges, onNodesChange, onEdgesChange, setEdges, setCurrentText } = props;

  // CHECK https://reactflow.dev/docs/quickstart/

  const edgeUpdateSuccessful = useRef(true);
  const onConnect = useCallback((params: any) => setEdges((edges: any) => addEdge(params, edges)), [setEdges]);


  const onDoubleClickEdge = (event: React.MouseEvent) => {
    console.log(event);

  };


  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        onNodeClick={(event, node) => handleNodeClick(setCurrentText, node)}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        onConnect={onConnect}
        onDoubleClick={onDoubleClickEdge}
      />

    </div>
  )
}

export default Flow;