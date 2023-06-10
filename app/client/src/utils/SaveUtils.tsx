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
  ]

  console.log(JSON.stringify(endArr));

  return endArr;
}

function createNode(arrNodes:HTMLCollectionOf<Element>, isImg: boolean): nodeSave[] {

  const endArr: nodeSave[] = [];

  Array.from(arrNodes).forEach(node => {

    // node styles
    const nodeInfo = window.getComputedStyle(node);
    // node position
    const pos = node.getBoundingClientRect();
    // node inputchild
    const inputChild = node.getElementsByClassName('input_text')[0];

    const nodeSetting = {
      background_color: nodeInfo.backgroundColor,
      position: { x: pos.x, y: pos.y },
      text: !isImg ? (inputChild as HTMLInputElement).value : node.querySelector('img')?.currentSrc + '',
      type: node.classList[0]
    }

    endArr.push(nodeSetting);
  });

  return endArr;
}