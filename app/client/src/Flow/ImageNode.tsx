import{ ChangeEvent, memo, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import mockImage from '../images/cat.jpg';

// CUSTOM IMAGE NODE

export default memo(() => {

  const [imgPath, setImagePath] = useState<string>(mockImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // THIS 2 FUNCTION WORK AS CHANGEPATH PROMPTS THE USER TO AN INPUT
  //  CHANHE FILE RECEIVES THE INPUT AND CHANGES THE CURENT IMAGE PATH

  const changePath = () => {
    fileInputRef.current?.click();
  }

  function changeFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImagePath(fileReader.result + '');
    }
    file && fileReader.readAsDataURL(file);

  }


  return (
    <div className='img_node'>
      <Handle type="source" className='handle handle-top' position={Position.Top} id="a" />
      <Handle type="source" className='handle' position={Position.Right} id="b" />
      <div className='node_image-container'>
        <img src={imgPath} onDoubleClick={changePath} alt="Not found" />
        <input
          type="file" accept="image/jpeg image/png image/gif
        " style={{ display: 'none' }} onChange={changeFile} ref={fileInputRef}
        />
      </div>
      <Handle type="source" className='handle' position={Position.Bottom} id="c" />
      <Handle type="source" className='handle' position={Position.Left} id="d" />
    </div>
  );
});