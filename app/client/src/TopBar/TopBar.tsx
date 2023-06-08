import './TopBar.css';
import {changeNodeText} from '../utils/FlowUtils';

function TopBar(props: any) {

  const { totalNodes, currentText, setCurrentText, nodes, setNodes} = props;

  function updateText(e: any) {
    const value = e.target.value;
    setCurrentText(value);
    changeNodeText(value, nodes, setNodes)
  }

  return (
    <div id="topbar">

      <div className='extras'>
        <h3>Total of nodes: {totalNodes}</h3>
        <button>Favorites</button>
      </div>

      <div className='details'>
        <label htmlFor="text">text</label>
        <input type="text" name="text" value={currentText} onChange={updateText} />
      </div>

      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;