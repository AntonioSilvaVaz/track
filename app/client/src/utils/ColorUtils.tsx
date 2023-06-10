// FUNCTION TO GET THE PARENT DIV COLOR
export function getParentColor(targetDiv: Element) {

  const parent = targetDiv.parentNode;
  const input = targetDiv.childNodes;

  const text_color = (parent as HTMLElement).style.color;
  const bg_color = (parent as HTMLElement).style.backgroundColor;

  (targetDiv as HTMLElement).style.backgroundColor = bg_color;
  input.forEach((node, index) => {
    if (index === 2) (node as HTMLElement).style.color = text_color;
    else (node as HTMLElement).style.backgroundColor = bg_color;
  })

}

// FUNCTION TO UPDATE THE DIV COLOR
export function updateColor(targetDiv: any, color: string) {

  const classes = targetDiv.classList;
  let class_value: any = '';
  let endTargetDiv: any = '';

  const isHorizontal = color.match('horizontal');

  if (classes[1] === 'input_text' && !isHorizontal) {
    endTargetDiv = targetDiv.parentElement;
    class_value = targetDiv.parentElement.classList[0];
  }
  else if ((classes[0] === 'rect_node' && !isHorizontal) || (classes[0] === 'round_node' && !isHorizontal)) {
    class_value = classes[0];
    endTargetDiv = targetDiv;
  }
  else if (isHorizontal && classes[1] === 'input_text') {
    endTargetDiv = targetDiv;
    class_value = targetDiv.classList[0];
  }
  else if (isHorizontal) {
    endTargetDiv = targetDiv.childNodes[2];
    class_value = targetDiv.childNodes[2].classList[0];
  }
  else return;


  const nodes = document.getElementsByClassName(class_value);

  if (!isHorizontal) {
    return Array.from(nodes).forEach((node) => {
      if (node === endTargetDiv) {

        const handleTop = node.getElementsByClassName('handle-top')[0];
        const handleBottom = node.getElementsByClassName('handle-bottom')[0];
        const handleRight = node.getElementsByClassName('handle-right')[0];
        const handleLeft = node.getElementsByClassName('handle-left')[0];

        (handleTop as HTMLElement).style.background = color;
        (handleBottom as HTMLElement).style.background = color;
        (handleRight as HTMLElement).style.background = color;
        (handleLeft as HTMLElement).style.background = color;
        (node as HTMLElement).style.background = color;
      }
      else return
    });
  } else {
    return Array.from(nodes).forEach((node) => {
      if (node === endTargetDiv) {
        color = color.slice(0, -'horizontal'.length);
        (node as HTMLElement).style.color = color;
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

// RETURNS AN HEX COLOR TO RGB
function hexToRgb(hex: string) {
  // don't understand ? ->
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}
