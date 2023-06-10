// ALL OF THE UTILITES FUNCTION TAHT ARE BEING USED BY THE REACT FLOW

import { MarkerType } from "reactflow";
import { nodeType, conectItems } from "../types";

let totalNodes: number = 0;

const savedItems: nodeType[] = []

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

export function giveInitialItems(arr: any) {
  const test = arr[0].items;
  const endArr: nodeType[] = [];

  test.forEach((item: any) => {
    totalNodes++;
    endArr.push({
      id: item.id,
      label: item.id,
      position: { x: item.positionX, y: item.positionY },
      data: { label: item.text },
      type: item.type,
    });
  });

  return endArr;
}

// RETURNS AN ARRAYS WITH ALL WHAT IS NEEDED TO CREATE THE INITIAL NODE CONNECTONS
export function connectInitialItems(): conectItems[] {
  const endArr: conectItems[] = [];
  // savedItems.forEach((item: nodeType) => {
  //   item.conection && item.conection.forEach((node: string) => {
  //     endArr.push({
  //       id: item.id + '-' + node,
  //       source: item.id,
  //       target: node,
  //       sourceHandle: 'c',
  //       targetHandle: 'a',
  //       type: 'floating',
  //       markerEnd: { type: MarkerType.ArrowClosed },
  //     });
  //   });
  // });
  return endArr;
}
