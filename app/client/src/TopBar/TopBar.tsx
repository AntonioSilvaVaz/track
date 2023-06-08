import { useState } from 'react';
import './TopBar.css';

function TopBar({ totalNodes }: { totalNodes: number }) {

  const [currentText, setCurrentText] = useState('');

  return (
    <div id="topbar">

      <div className='extras'>
        <h3>Total of nodes: {totalNodes}</h3>
        <button>Favorites</button>
      </div>

      <div className='details'>
        <label htmlFor="text">text</label>
        <input type="text" name="text" value={currentText} onChange={(e) => setCurrentText(e.target.value)} />
      </div>

      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;