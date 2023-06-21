import { RefObject } from "react";

const colors = ['red', 'blue', 'pink', 'purple', 'yellow', 'white'];

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

  polyline.style.stroke = colors[0];
  colors.splice(0, 1);
  polyline.setAttribute('points', `${startX},${startY} ${startX},${startY}`);
  animatePath({ startX, startY, endX, endY }, polyline, svgElement);
  return polyline;
}

function deletePolyline(svg: SVGSVGElement, polyline: SVGPolylineElement): void {
  let opacity = 1;
  const removePathInterval = setInterval(() => {
    opacity -= 0.1;
    console.log(opacity);
    polyline.style.opacity = opacity + '';
    if (opacity <= 0) {
      clearInterval(removePathInterval);
      svg.removeChild(polyline);
    }
  }, 180);
}

export function connectDivsWithPolyline(
  startDiv: RefObject<HTMLDivElement>,
  endDiv: RefObject<HTMLDivElement>,
  svgRef: RefObject<SVGSVGElement>,
  startDelay: number) {

  const circle = startDiv.current;
  const circle2 = endDiv.current;
  const svgElement = svgRef.current;

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