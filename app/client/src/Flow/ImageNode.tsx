import{ ChangeEvent, memo, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';

// CUSTOM IMAGE NODE

export default memo(() => {

  const [imgPath, setImagePath] = useState<string>('../images/lightMode1.jpg');
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
    <div>
      <Handle type="source" className='node_image_size node_image-top' position={Position.Top} id="a" />
      <Handle type="source" className='node_image_size node_image-left' position={Position.Right} id="b" />
      <div className='node_image-container'>
        <img src={imgPath} onDoubleClick={changePath} alt="Not found" className={'node_image '} />
        <input
          type="file" accept="image/jpeg image/png image/gif
        " style={{ display: 'none' }} onChange={changeFile} ref={fileInputRef}
        />
      </div>
      <Handle type="source" className='node_image_size node_image-right' position={Position.Bottom} id="c" />
      <Handle type="source" className='node_image_size node_image-bottom' position={Position.Left} id="d" />
    </div>
  );
});