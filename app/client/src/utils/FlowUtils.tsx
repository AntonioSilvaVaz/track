// ALL OF THE UTILITES FUNCTION TAHT ARE BEING USED BY THE REACT FLOW

import { MarkerType } from "reactflow";
import { nodeType, conectItems } from "../types";

let totalNodes: number = 0;

const savedItems: nodeType[] = [
  { position: { x: 200, y: 100 }, data: { label: 'id 1' }, conection: ['2'], id: '1' },
  { position: { x: 200, y: 200 }, data: { label: 'id 2' }, conection: [], id: '2' }
]

// CREATES A NEW RECTANGLE NODE ITEM
export const createNewRectNode = (setNodes: any, x?: number, y?: number) => {
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'rectNode',
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

// CREATES A NEW ROUND NODE ITEM
export const createNewRoundNode = (setNodes: any, x?: number, y?: number) => {
  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "yo" },
        type: 'roundNode',
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

// CREATES A NEW NODE IMAGE
export const createNewNodeImage = (setNodes: any, x?: number, y?: number) => {

  setNodes((currNodes: nodeType[]) => {
    const newNodesArr: nodeType[] = [
      ...currNodes,
      {
        // by some reason the id needs to be a string
        id: totalNodes + '',
        label: totalNodes + '',
        position: x && y ? { x, y } : { x: 500, y: 400 },
        data: { label: "" },
        type: 'imageNode',
      }
    ];
    return newNodesArr;
  });
  return totalNodes++;
}

// RETURNS AN ARRAY WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODES
export function getAllitems(): nodeType[] {
  const endArr: nodeType[] = [];
  savedItems.forEach((item: nodeType) => {
    totalNodes++;
    endArr.push({
      id: item.id,
      label: item.id,
      position: item.position,
      data: { label: item.data.label },
      type: 'rectNode',
    });
  });
  return endArr;
}

// RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTONS
export function connectInitialItems(): conectItems[] {
  const endArr: conectItems[] = [];
  savedItems.forEach((item: nodeType) => {
    item.conection && item.conection.forEach((node: string) => {
      endArr.push({
        id: item.id + '-' + node,
        source: item.id,
        target: node,
        sourceHandle: 'c',
        targetHandle: 'a',
        type: 'floating',
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    });
  });
  return endArr;
}

// FUNCTIONS TO CHANGE TO THE NEW COLOR
export function changeBoxColor(event: any) {
  const nodes = document.getElementsByClassName('rect_node');
  Array.from(nodes).forEach((node) => {
    if (node === event.currentTarget) {
      const handleTop = node.getElementsByClassName('handle-top')[0];
      (handleTop as HTMLElement).style.background = 'linear-gradient(to bottom right, #281919, #1e0707)';
      (node as HTMLElement).style.background = 'linear-gradient(to bottom right, #281919, #1e0707)';
    }
    else return
  });
}

// FUNCTION TO UPDATE THE DIV COLOR
export function updateColor(targetDiv: any, color: string) {

  const classes = targetDiv.classList;
  let class_value: any = '';
  let endTargetDiv: any = '';

  if (classes[1] === 'input_text') {
    endTargetDiv = targetDiv.parentElement;
    class_value = targetDiv.parentElement.classList[0];
  }
  else if (classes[0] == 'rect_node' || classes[0] == 'round_node') {
    class_value = classes[0];
    endTargetDiv = targetDiv;
  }
  else return;

  const nodes = document.getElementsByClassName(class_value);

  Array.from(nodes).forEach((node) => {
    if (node === endTargetDiv) {
      const handleTop = node.getElementsByClassName('handle-top')[0];
      (handleTop as HTMLElement).style.background = color;
      (node as HTMLElement).style.background = color;
    }
    else return
  });
}