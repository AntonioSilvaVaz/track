import './LeftBar.css';
import { createNewNode } from "../utils/FlowUtils";


// CHANGE TYPE ANY TO THE SETNODES TYPE
// Couldn't find anything about it
function LeftBar(props: any) {

  const { setNodes } = props;

  return (
    <div id="leftbar">

      <div className="dashboard">
        <h2>Dashboard</h2>
      </div>

        <div className='btn-items'>
          <button>
            <h3>Image</h3>
          </button>

          <button onClick={() => createNewNode(setNodes)}>
            <h3>Item</h3>
          </button>

          <button>
            <h3>Text</h3>
          </button>

          <button>
            <h3>Favorites</h3>
          </button>
      </div>



      <button className='export-btn'>
        <h2>Export</h2>
      </button>

    </div>
  )
}

export default LeftBar;