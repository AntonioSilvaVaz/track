import { DashboardType } from '../../types';
import './DashboardBar.css';

function DashboardBar({ title, rightText, callback, extraCallback, extraStyle }: DashboardType) {

  return (
    <section id="dashboardBar">
      <div style={extraStyle} className={`dashboard ${extraCallback && 'hover'}`} onClick={extraCallback}>
        <h2>{title}</h2>
      </div>
      <h3 className='logout hover' onClick={callback}>{rightText}</h3>
    </section>
  )
}

export default DashboardBar;