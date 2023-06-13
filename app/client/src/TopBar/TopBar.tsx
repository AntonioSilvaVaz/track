import { saveFile } from '../utils/SaveUtils';
import './TopBar.css';

function TopBar(props: any) {

  const { title, page, saved, setSaved, edges, setShowProject } = props;

  function leaveThisPage() {
    document.cookie = 'project_id=0';
    setShowProject(false);
  }

  function saveChanges() {
    const text_save = document.getElementById('text-save');

    saveFile(edges)
      .then(res => {
        setSaved('Saved');
        (text_save as HTMLElement).style.color = 'green';

      })
      .catch(err => {
        setSaved('Failed Saving');
        (text_save as HTMLElement).style.color = 'red';
      })

    setTimeout(() => {
      setSaved('');
    }, 5000)
  }

  return (
    <div id="topbar">
      <div className='dashboard' onClick={leaveThisPage}>
        <h2>{title}</h2>
      </div>
      <div className='save' onClick={saveChanges}></div>
      <h3 id='text-save'>{saved}</h3>
      <h3 className='currentPage'>{page}</h3>
    </div>
  )
}

export default TopBar;