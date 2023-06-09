import { useCallback } from "react";
import ReactFlow, { addEdge, ConnectionMode, MarkerType, Edge } from "reactflow";

import SimpleFloatingEdge from './SimpleFloatingEdge';
import ItemNode from "./ItemNode";
import ImageNode from "./ImageNode";

import 'reactflow/dist/style.css';
import './Flow.css';

const nodeTypes = { itemNode: ItemNode, imageNode: ImageNode };
const edgeTypes = { floating: SimpleFloatingEdge };


// DON'T know how to not use any
function Flow(props: any) {
  const { nodes, edges, onNodesChange, onEdgesChange, setEdges } = props;

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: Edge[]) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    []
  );

  // CHECK
  // https://reactflow.dev/docs/quickstart/
  // https://reactflow.dev/docs/examples/edges/simple-floating-edges/

  return (
    <div style={{ width: '100%', height: '100%' }}>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
      >

      </ReactFlow>

    </div>
  )
}

export default Flow;