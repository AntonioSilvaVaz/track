import './TopBar.css';

function TopBar({ totalNodes }: { totalNodes: number }) {

  return (
    <div id="topbar">

      <div>
        <h3>Total of nodes: {totalNodes}</h3>
        <button>Favorites</button>
      </div>

      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;