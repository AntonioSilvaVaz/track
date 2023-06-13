import './DashboardBar.css';

function DashboardBar({ title, rightText, callback }: any) {

  return (
    <div id="dashboardBar">
      <div className='dashboard'>
        <h2>{title}</h2>
      </div>
      <h3 className='logout hover' onClick={callback}>{rightText}</h3>
    </div>
  )
}

export default DashboardBar;