import { useRef, useEffect } from "react";
import { motion } from "framer-motion"
import './LoginPolylines.css';
import { connectAndCreateRandomPolylines } from "../../utils/PolylineUtils";

function LoginPolylines() {

  const allRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]
  const svgRef = useRef<SVGSVGElement>(null);


  useEffect(() => {
    if (svgRef.current) {
      connectAndCreateRandomPolylines(svgRef.current, allRefs);
    }
  }, [])

  const items = ['one', 'two', 'three', 'four'];

  const allItems = items.map((item, index) => {
    return (
      <motion.div className={`inside ${item}`} key={item} ref={allRefs[index]}

        animate={{
          borderRadius: ['0px', '200px', '200px', '0px'],
          width: ['40px', '80px', '80px', '40px'],
          scale: 1,
        }}

        transition={{
          type: "tween",
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          delay: index * 0.9
        }}>

        <h3>{item}</h3>
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