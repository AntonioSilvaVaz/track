import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import image from '../images/lightMode1.jpg';

// CUSTOM IMAGE NODE

export default memo(() => {

  return (
    <div>
      <Handle type="source" className='node_image_size node_image-top' position={Position.Top} id="a" />
      <Handle type="source" className='node_image_size node_image-left' position={Position.Right} id="b" />
      <div className='node_image-container'>
        <img src={image} alt="Not found" id='resizeImage' className='node_image' />
      </div>
      <Handle type="source" className='node_image_size node_image-right' position={Position.Bottom} id="c" />
      <Handle type="source" className='node_image_size node_image-bottom' position={Position.Left} id="d" />
    </div>
  );
});