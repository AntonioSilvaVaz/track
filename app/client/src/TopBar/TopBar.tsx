import './TopBar.css';

function TopBar() {

  function saveChanges(event: any) {

  }

  return (
    <div id="topbar">
      <div className='save' onClick={saveChanges}></div>
      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;