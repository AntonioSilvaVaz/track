import './TopBar.css';

function TopBar(props: {totalNodes: number}) {

  const { totalNodes } = props;

  return (
    <div id="topbar">
      <h3>Total of nodes: {totalNodes}</h3>
      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;