import { DashboardType } from '../types';
import './DashboardBar.css';

function DashboardBar({ title, rightText, callback }: DashboardType) {

  return (
    <section id="dashboardBar">
      <div className='dashboard'>
        <h2>{title}</h2>
      </div>
      <h3 className='logout hover' onClick={callback}>{rightText}</h3>
    </section>
  )
}

export default DashboardBar;