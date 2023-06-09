import { useCallback, useRef, useState } from "react";
import ReactFlow, { addEdge, ConnectionMode, MarkerType, Edge } from "reactflow";

import SimpleFloatingEdge from './SimpleFloatingEdge';

import RoundItemNode from "./RoundItemNode";
import RectItemNode from "./RectItemNode";
import ImageNode from "./ImageNode";

import 'reactflow/dist/style.css';
import './Flow.css';
import { createNewRectNode, createNewRoundNode, createNewNodeImage } from "../utils/FlowUtils";

// USED FOR THE CUSTOM NODES AND EDGES
const nodeTypes = { rectNode: RectItemNode, roundNode: RoundItemNode ,imageNode: ImageNode };
const edgeTypes = { floating: SimpleFloatingEdge };

// DON'T know how to not use any
function Flow(props: any) {

  // ALL PROPS NEEDED
  const { nodes, edges, onNodesChange, onEdgesChange, setEdges, setNodes } = props;

  // USED FOR THE DRAG AND DROP
  const reactFlowWrapper: any = useRef(null);
  const [reactFlowInstance, setReactFlowInstance]: [any, any] = useState(null);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: Edge[]) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const y = event.clientY - reactFlowBounds.top;
      const x = event.clientX - reactFlowBounds.left;

      if (type === 'itemNodeRect') {
        createNewRectNode(setNodes, x, y)
      } else if (type === 'itemNodeRound') {
        createNewRoundNode(setNodes, x, y)
      } else if (type === 'imageNode') {
        createNewNodeImage(setNodes, x, y)
      } else {
        return;
      }
    },
    [reactFlowInstance]
  );



  // CHECK
  // https://reactflow.dev/docs/quickstart/
  // https://reactflow.dev/docs/examples/edges/simple-floating-edges/

  return (

    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onInit={setReactFlowInstance}

        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
      >

      </ReactFlow>
    </div>


  )
}

export default Flow;