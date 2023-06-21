import { RefObject } from "react";

const colors = [
  '#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF','#00FFFF','#FFA500','#800080',
  '#FFC0CB','#008000','#008080','#800000','#808000','#808080','#C0C0C0','#800000',
  '#808000','#800080','#008000','#008080','#000080','#800000','#808000','#800080',
  '#008000','#008080','#000080','#FF0000','#00FF00','#0000FF'
];
let allRefs: RefObject<HTMLDivElement>[] = [];
let count = 0;

function animatePath(
  { startX, startY, endX, endY }: { startX: number, startY: number, endX: number, endY: number },
  polyline: SVGPolylineElement,
  svgElement: SVGSVGElement
) {

  let currX = startX;
  let currY = startY;
  const velocity = 10;
  const deltaX = endX - currX;
  const deltaY = endY - currY;

  function animatePolyline() {
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normalizedDeltaX = (deltaX / distance) * velocity;
    const normalizedDeltaY = (deltaY / distance) * velocity;

    currX += normalizedDeltaX;
    currY += normalizedDeltaY;
    polyline.setAttribute('points', `${startX},${startY} ${currX},${currY}`);

    if (Math.abs(currX - endX) > Math.abs(normalizedDeltaX) || Math.abs(currY - endY) > Math.abs(normalizedDeltaY)) {
      requestAnimationFrame(animatePolyline);
    } else {
      setTimeout(() => {
        deletePolyline(svgElement, polyline)
      }, 1000);
    }
  };

  requestAnimationFrame(animatePolyline);

}

function createPolyline(
  { startX, startY, endX, endY }:
    { startX: number, startY: number, endX: number, endY: number },
  svgElement: SVGSVGElement

): SVGPolylineElement {


  const xmlns = 'http://www.w3.org/2000/svg';
  const polyline = document.createElementNS(xmlns, 'polyline');

  const randomColorPosition = Math.round(Math.random() * colors.length);
  polyline.style.stroke = colors[randomColorPosition];

  polyline.setAttribute('points', `${startX},${startY} ${startX},${startY}`);
  animatePath({ startX, startY, endX, endY }, polyline, svgElement);
  return polyline;
}

function deletePolyline(svg: SVGSVGElement, polyline: SVGPolylineElement): void {
  let opacity = 1;
  const removePathInterval = setInterval(() => {
    opacity -= 0.1;
    polyline.style.opacity = opacity + '';
    if (opacity <= 0) {
      count++;
      if (count === 5) connectAndCreateRandomPolylines(svg);
      clearInterval(removePathInterval);
      svg.removeChild(polyline);
    }
  }, 200);
}

function connectDivsWithPolyline(
  startDiv: RefObject<HTMLDivElement>,
  endDiv: RefObject<HTMLDivElement>,
  svgElement: SVGSVGElement,
  startDelay: number) {

  const circle = startDiv.current;
  const circle2 = endDiv.current;

  if (circle && circle2 && svgElement) {
    // .slice(0, -2) removes 'px' from the returned values
    const circleStyle = window.getComputedStyle(circle);
    const circle2Style = window.getComputedStyle(circle2);

    const halfCircleWidth = Number(circleStyle.width.slice(0, -2)) / 2;
    const halfCircleHeight = Number(circleStyle.height.slice(0, -2)) / 2;
    const halfCircle2Width = Number(circle2Style.width.slice(0, -2)) / 2;
    const halfCircle2Height = Number(circle2Style.height.slice(0, -2)) / 2;

    const circleLeft = Number(circleStyle.getPropertyValue('left').slice(0, -2)) + halfCircleWidth;
    const circleTop = Number(circleStyle.getPropertyValue('top').slice(0, -2)) + halfCircleHeight;
    const circle2Left = Number(circle2Style.getPropertyValue('left').slice(0, -2)) + halfCircle2Width;
    const circle2Top = Number(circle2Style.getPropertyValue('top').slice(0, -2)) + halfCircle2Height;

    setTimeout(() => {

      const options = {
        startX: circleLeft, startY: circleTop,
        endX: circle2Left, endY: circle2Top
      };

      const polyline = createPolyline(options, svgElement);
      svgElement.appendChild(polyline);
    }, startDelay);
  }
};

export function connectAndCreateRandomPolylines(
  svg: SVGSVGElement,
  allCircleRefs?: RefObject<HTMLDivElement>[]
) {

  if (!allRefs[0] && allCircleRefs) allRefs = [...allCircleRefs];
  if (allRefs) {
    count = 0;
    for (let index = 0; index < 5; index++) {
      const [source, target] = getRandomPositions(allRefs);
      connectDivsWithPolyline(source, target, svg, index * 300);
    }
  };
}

function getRandomPositions(arr: any): RefObject<HTMLDivElement>[] {

  const allEls = [...arr];

  const firstPosition = Math.floor(Math.random() * allEls.length);
  const source = allEls[firstPosition];
  allEls.splice(firstPosition, 1);

  const secondPosition = Math.floor(Math.random() * allEls.length);
  const target = allEls[secondPosition];
  allEls.splice(0, secondPosition);

  return [source, target];
}