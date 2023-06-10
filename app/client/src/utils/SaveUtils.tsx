import { nodeSave } from "../types";

export function saveFile() {

  const allRectNodes = document.getElementsByClassName('rect_node');
  const allRoundNodes = document.getElementsByClassName('round_node');
  const allImageNodes = document.getElementsByClassName('img_node');
  // const paths = document.getElementsByClassName('react-flow__edge-path');

  const allInfoRectNodes = createNode(allRectNodes, false);
  const allInfoRoundNodes = createNode(allRoundNodes, false);
  const allInfoImageNodes = createNode(allImageNodes, true);

  const endArr = [
    ...allInfoRectNodes,
    ...allInfoRoundNodes,
    ...allInfoImageNodes
  ];


  return fetch('http://localhost:3001/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(endArr),
  });

}

function createNode(arrNodes: HTMLCollectionOf<Element>, isImg: boolean): nodeSave[] {

  const endArr: nodeSave[] = [];

  Array.from(arrNodes).forEach(node => {

    if (!isImg) {
      const nodeSaved = handleItemNodes(node)
      endArr.push(nodeSaved);
    }
  });

  return endArr;
}

function handleItemNodes(node: any) {
  // node styles
  const nodeInfo = window.getComputedStyle(node);
  // node position
  const pos = node.getBoundingClientRect();
  // node inputchild
  const inputChild = node.getElementsByClassName('input_text')[0];

  // GETS THE ELEMENT ID
  const child: any = node.childNodes[0];
  const id: number = child.getAttribute('data-nodeid');

  const text_color = (inputChild as HTMLInputElement).style.color;

  return {
    id,
    text_color,
    background_color: nodeInfo.backgroundColor,
    position: { x: pos.x, y: pos.y },
    text: (inputChild as HTMLInputElement).value,
    type: node.classList[0]
  }
}