import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'reactflow';
import mockImage from '../../images/cat.jpg';
import { addToFiles, saveFile } from '../../utils/SaveUtils';
import { findMyImage } from '../../utils/FlowUtils';

// CUSTOM IMAGE NODE

export default memo(() => {

  const [imgPath, setImagePath] = useState<string>(mockImage);
  const thisNode: any = useRef(null);

  useEffect(() => {
    if (thisNode.current) {
      const pathSet = findMyImage(thisNode.current);
      if(pathSet) setImagePath(pathSet)
    }
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const img = useRef(null)
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

    addToFiles(e, thisNode.current);
  }

  function resizeImage() {

  }

  return (
    <div className='img_node' ref={thisNode}>
      <Handle className='handle handle-top' type="source" position={Position.Top} id="a" />
      <Handle className='handle handle-right' type="source" position={Position.Right} id="b" />
      <div className='node_image-container'>
        <img ref={img} src={imgPath} onDoubleClick={changePath} alt="Not found" />
        <input
          type="file" accept="image/jpeg image/png image/gif
        " style={{ display: 'none' }} onChange={changeFile} ref={fileInputRef}
        />
      </div>
      <Handle className='handle handle-bottom' type="source" position={Position.Bottom} id="c" />
      <Handle className='handle handle-left' type="source" position={Position.Left} id="d" />
    </div>
  );
});