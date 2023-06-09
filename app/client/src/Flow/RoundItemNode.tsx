import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { updateColor } from '../utils/FlowUtils';

// HERE YOU CAN CUSTOMIZE YOUR NODE 'item'

export default memo(() => {


  const [text, setText] = useState('text');

  return (
    <div className='round_node _node' onDoubleClick={(e) => updateColor(e.currentTarget)}>
      <Handle className='handle handle-top' type="source" position={Position.Top} id="a" />
      <Handle className='handle handle-right ' type="source" position={Position.Right} id="b" />
      <input style={{ color: 'white' }} className="nodrag input_text" id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
      <Handle className='handle handle-bottom' type="source" position={Position.Bottom} id="c" />
      <Handle className='handle handle-left' type="source" position={Position.Left} id="d" />
    </div>
  );
});