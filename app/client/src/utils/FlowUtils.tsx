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

// FUNCTION TO UPDATE THE DIV COLOR
const colors = ['red', 'yellow', 'violet', 'black', 'white', 'blue', 'orange', 'grey', 'brown', 'purple', 'wheat', 'green'];
export function updateColor(targetDiv: any, color?: string) {

  const classes = targetDiv.classList;
  let class_value: any = '';
  let endTargetDiv: any = '';

  const isHorizontal = color?.match('horizontal');


  if (classes[1] === 'input_text' && !isHorizontal) {
    endTargetDiv = targetDiv.parentElement;
    class_value = targetDiv.parentElement.classList[0];
  }
  else if (classes[0] === 'rect_node' && !isHorizontal || classes[0] === 'round_node' && !isHorizontal) {
    class_value = classes[0];
    endTargetDiv = targetDiv;
  }
  else if(isHorizontal && classes[1] === 'input_text'){
    endTargetDiv = targetDiv;
    class_value = targetDiv.classList[0];
  }
  else if(isHorizontal){
    endTargetDiv = targetDiv.childNodes[2];
    class_value = targetDiv.childNodes[2].classList[0];
  }
  else return;


  const nodes = document.getElementsByClassName(class_value);

  if(!isHorizontal){
    return Array.from(nodes).forEach((node) => {
      if (node === endTargetDiv) {
        const selectedColor = color ? color : colors[Math.floor(Math.random() * colors.length)];
        const handleTop = node.getElementsByClassName('handle-top')[0];
        const handleBottom = node.getElementsByClassName('handle-bottom')[0];
        const handleRight = node.getElementsByClassName('handle-right')[0];
        const handleLeft = node.getElementsByClassName('handle-left')[0];

        (handleTop as HTMLElement).style.background = selectedColor;
        (handleBottom as HTMLElement).style.background = selectedColor;
        (handleRight as HTMLElement).style.background = selectedColor;
        (handleLeft as HTMLElement).style.background = selectedColor;

        (node as HTMLElement).style.background = selectedColor;
      }
      else return
    });
  } else{
    return Array.from(nodes).forEach((node) => {
      if (node === endTargetDiv) {
        const selectedColor = color && color.slice(0, -'horizontal'.length);
        (node as HTMLElement).style.color = selectedColor ? selectedColor : 'black';
      }
      else return
    });
  }

}

// MERGES TWO COLORS FROM 2 HAXADECIMAL INPUTS
export function createMergedColor(colorToUse: string, colorMerge: string): string {

  const rgb1 = hexToRgb(colorToUse);
  const rgb2 = hexToRgb(colorMerge);

  let merged = [
    Math.floor((rgb1.r + rgb2.r) / 2),
    Math.floor((rgb1.g + rgb2.g) / 2),
    Math.floor((rgb1.b + rgb2.b) / 2),
  ]

  // don't understand ? ->
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  return "#" + ((1 << 24) + (merged[0] << 16) + (merged[1] << 8) + merged[2]).toString(16).slice(1);
}

function hexToRgb(hex: string) {
  // don't understand ? ->
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}
