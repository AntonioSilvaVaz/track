import './LeftBar.css';
import { createNewNode, createNewNodeImage } from "../utils/FlowUtils";


// CHANGE TYPE ANY TO THE SETNODES TYPE
// Couldn't find anything about it
function LeftBar(props: any) {

  const { setNodes } = props;

  const handleDrag = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div id="leftbar">

      <div className="dashboard">
        <h2>Dashboard</h2>
      </div>

        <div className='btn-items'>

        <button onDragStart={(event)=> handleDrag(event, 'itemNode')} onClick={() => createNewNode(setNodes)} draggable>
            <h3>Item</h3>
          </button>

          <button onDragStart={(event)=> handleDrag(event, 'imageNode')} onClick={() => createNewNodeImage(setNodes)} draggable>
            <h3>Image</h3>
          </button>

      </div>



      <button className='export-btn'>
        <h2>Export</h2>
      </button>

    </div>
  )
}

export default LeftBar;