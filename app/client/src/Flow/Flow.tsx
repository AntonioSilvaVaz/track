import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { addEdge, ConnectionMode, MarkerType, Edge } from "reactflow";

import SimpleFloatingEdge from './SimpleFloatingEdge';

import RoundItemNode from "./RoundItemNode";
import RectItemNode from "./RectItemNode";
import ImageNode from "./ImageNode";

import 'reactflow/dist/style.css';
import './Flow.css';
import { createNewRectNode, createNewRoundNode, createNewNodeImage, fetchData } from "../utils/FlowUtils";
import { updateColor } from "../utils/ColorUtils";

// USED FOR THE CUSTOM NODES AND EDGES
const nodeTypes = { rect_node: RectItemNode, round_node: RoundItemNode, img_node: ImageNode };
const edgeTypes = { floating: SimpleFloatingEdge };

// DON'T know how to not use any
function Flow(props: any) {

  // ALL PROPS NEEDED
  const { nodes, edges, onNodesChange, onEdgesChange, setEdges, setNodes, currentProjectId } = props;

  // USED FOR THE DRAG AND DROP
  const reactFlowWrapper: any = useRef(null);
  const [reactFlowInstance, setReactFlowInstance]: [any, any] = useState(null);

  useEffect(() => {
    if (reactFlowInstance) {
      fetchData(setNodes, setEdges, reactFlowInstance, currentProjectId);
      reactFlowInstance.zoomTo(1, { x: 0, y: 0 });
    }
  }, [reactFlowInstance]);


  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: Edge[]) =>
        addEdge({ ...params, type: 'floating', markerEnd: { type: MarkerType.Arrow } }, eds)
      ),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const targetDiv = event.target;

      console.log(reactFlowBounds.left, reactFlowBounds.top);

      const { x, y } = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (type === 'itemNodeRect') createNewRectNode(setNodes, x, y)
      else if (type === 'itemNodeRound') createNewRoundNode(setNodes, x, y)
      else if (type === 'imageNode') createNewNodeImage(setNodes, x, y)
      else if (type !== '') updateColor(targetDiv, type);
      else return;
    },
    [reactFlowInstance]
  );


  // CHECK
  // https://reactflow.dev/docs/quickstart/
  // https://reactflow.dev/docs/examples/edges/simple-floating-edges/

  return (

    <div id="react-flow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
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