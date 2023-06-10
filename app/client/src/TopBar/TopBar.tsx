import { saveFile } from '../utils/SaveUtils';
import './TopBar.css';

function TopBar(props: any) {

  const { saved, setSaved } = props;

  function saveChanges(event: any) {
    const text_save = document.getElementById('text-save');

    saveFile()
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
      <div className='save' onClick={saveChanges}></div>
      <h3 id='text-save'>{saved}</h3>
      <h3 className='currentPage'>Track</h3>
    </div>
  )
}

export default TopBar;