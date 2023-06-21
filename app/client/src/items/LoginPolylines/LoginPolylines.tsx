import { useRef, RefObject, useEffect } from "react";
import { motion } from "framer-motion"
import './LoginPolylines.css';
import { connectDivsWithPolyline } from "./PolylineUtils";

function LoginPolylines() {

  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const circle3Ref = useRef<HTMLDivElement>(null);
  const circle4Ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(()=>{
    connectDivsWithPolyline(circle1Ref, circle2Ref, svgRef, 200);
    // connectDivsWithPolyline(circle1Ref, circle3Ref, svgRef, 300);
    // connectDivsWithPolyline(circle3Ref, circle2Ref, svgRef, 400);
    // connectDivsWithPolyline(circle4Ref, circle2Ref, svgRef, 500);
    // connectDivsWithPolyline(circle4Ref, circle1Ref, svgRef, 600);
  }, [])

  const items = [
    { name: 'one', ref: circle1Ref },
    { name: 'two', ref: circle2Ref },
    { name: 'three', ref: circle3Ref },
    { name: 'four', ref: circle4Ref }
  ];

  const allItems = items.map((item, index) => {
    return (
      <motion.div className={`inside ${item.name}`} key={item.name} ref={item.ref}

        animate={{
          borderRadius: ['0px', '200px', '200px', '0px'],
          rotateZ: [0, 100, 100, 200, 200, 100, 100, 0],
          scale: 1,
        }}

        transition={{
          type: "tween",
          duration: 4,
          repeat: Infinity,
          repeatDelay: 1,
          delay: index * 0.9
        }}>

        <h3>{item.name}</h3>
      </motion.div>
    )
  });

  return (
    <div className="circle-container">
      <div className="circle">
        {allItems}
        <svg ref={svgRef}></svg>
      </div>
    </div>
  )
}

export default LoginPolylines;