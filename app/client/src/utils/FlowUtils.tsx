// ALL OF THE UTILITIS FUNCTIONS THAT ARE BEING USED BY THE REACT FLOW
import { MarkerType } from "reactflow";
import { nodeType, connectItems } from "../types";

let totalNodes: number = 0;

let currentText: { id: number, text: string }[] = [];
export let currentImages: { id: number, img: string }[] = [];

// THIS IS REALLY IMPORTANT BECAUSE OF THE WAY THE LOADING IS STRUCTURED
// IF THE ITEMS DON'T GET RESTARTED THEN WITH MORE THAN 1 DOCUMENT
// THEY START LOADING THE WRONG INFORMATION
export function resetItems() {
  currentText = [];
  currentImages = [];
}

export function pushToFiles(img: string, id: number) {
  let itemPlaced = false;
  const newFiles = currentImages.map(item => {
    if (item.id === id) {
      itemPlaced = true;
      return { img, id }
    } else return item;
  });

  if (!itemPlaced) newFiles.push({ id, img });
  currentImages = newFiles;
}

// CREATES A NEW RECTANGLE NODE ITEM
export const createNewRectNode = (setNodes: any, x?: number, y?: number) => {
  totalNodes++;
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'rect_node',
      }
    ];
    return newNodesArr;
  });
}

// CREATES A NEW ROUND NODE ITEM
export function createNewRoundNode (setNodes: any, x?: number, y?: number) {
  totalNodes++;
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'round_node',
      }
    ];
    return newNodesArr;
  });
}

// CREATES A NEW NODE IMAGE
export function createNewNodeImage (setNodes: any, x?: number, y?: number) {
  totalNodes++;
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "" },
        type: 'img_node',
      }
    ];
    return newNodesArr;
  });
}

// GETS AN ARRAY WITH THE INITIAL NODES
export function getInitialItems(arr: any, reactFlowInstance: any) {

  const reactFlowWrapper = document.getElementById('react-flow-wrapper');
  const reactFlowBounds = reactFlowWrapper && reactFlowWrapper.getBoundingClientRect();
  const flowX = reactFlowBounds && reactFlowBounds.x ? reactFlowBounds.left : 166;
  const flowY = reactFlowBounds && reactFlowBounds.top ? reactFlowBounds.top : 66;

  return arr.map((item: any, index: number) => {

    totalNodes = item.id >= totalNodes ? Number(item.id) + 1 : totalNodes;
    currentText.push({ id: item.id, text: item.text });
    item.file && currentImages.push({ id: item.id, img: item.file });

    const { x, y } = reactFlowInstance.project({
      x: item.positionX - flowX,
      y: item.positionY - flowY,
    });

    return {
      id: item.id,
      label: item.id,
      position: { x, y },
      data: {
        label: item.text,
      },
      type: item.type,
      style: {
        color: item.text_color,
        backgroundColor: item.background_color
      },
    };
  });
}

// RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTIONS
export function connectInitialItems(edges: [{ sourceId: string, targetId: string, sourceHandle: string, targetHandle: string }]): connectItems[] {

  return edges.map(item => ({
    id: item.sourceId + '-' + item.targetId,
    source: item.sourceId,
    target: item.targetId,
    sourceHandle: item.sourceHandle,
    targetHandle: item.targetHandle,
    type: 'floating',
    markerEnd: { type: MarkerType.ArrowClosed },
  }));
}

// CHANGES THE TEXT THE THE TEXT THAT WAS SAVED
export function findMyText(node: Element) {
  const parentNode: any = node.parentElement;
  const id = parentNode.getAttribute("data-id");
  const text = currentText.filter((item) => item.id === id);
  return text[0]?.text;
}

// FINDS A SPECIFIC IMAGE IN THE FLOW
export function findMyImage(node: Element) {
  const parentNode: any = node.parentNode;
  const id = parentNode.getAttribute("data-id");
  const text = currentImages.filter((item) => item.id === id);
  return text[0]?.img;
}

// FETCHES THE INITIAL DATA
export async function fetchData(setNodes: any, setEdges: any, reactFlowInstance: any) {

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/info`, { credentials: 'include', });
  const data = await res.json();

  if (data[0]) {
    try {
      const nodes = getInitialItems(data[0].items, reactFlowInstance);
      const edges = connectInitialItems(data[0].connections);
      setNodes(nodes);
      setEdges(edges);
    } catch (error) {
      return error;
    }
  }
}