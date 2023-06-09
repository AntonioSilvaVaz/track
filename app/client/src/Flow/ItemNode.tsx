import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

// HERE YOU CAN CUSTOMIZE YOUR NODE 'item'

export default memo(() => {


  const [text, setText] = useState('text');

  return (
    <>
      <Handle type="source" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Right} id="b" />
      <input id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} className="nodrag input_text" />
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Left} id="d" />
    </>
  );
});