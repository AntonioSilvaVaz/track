import { saveFile } from '../utils/SaveUtils';
import './TopBar.css';

function TopBar() {

  function saveChanges(event: any) {
    saveFile();
  }

  return (
    <div id="topbar">
      <div className='save' onClick={saveChanges}></div>
      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;