import { memo, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { getParentColor } from '../../utils/ColorUtils';
import { findMyText } from '../../utils/FlowUtils';

// HERE YOU CAN CUSTOMIZE YOUR NODE 'item'

export default memo(() => {

  const [text, setText] = useState<string>('text');
  const thisNode = useRef(null);

  useEffect(() => {
    if (thisNode.current) {
      getParentColor(thisNode.current);
      const textSet = findMyText(thisNode.current);
      if (textSet) setText(textSet)
    }
  }, []);


  return (
    <div className='round_node _node' ref={thisNode}>
      <Handle className='handle handle-top' type="source" position={Position.Top} id="a" />
      <Handle className='handle handle-right ' type="source" position={Position.Right} id="b" />
      <input className="nodrag input_text" id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
      <Handle className='handle handle-bottom' type="source" position={Position.Bottom} id="c" />
      <Handle className='handle handle-left' type="source" position={Position.Left} id="d" />
    </div>
  );
});