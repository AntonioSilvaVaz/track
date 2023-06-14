import { useContext } from "react";
import { Context, FlowContext } from '../Context/context';

import { saveFile } from '../utils/SaveUtils';
import './TopBar.css';
import { resetItems } from "../utils/FlowUtils";

function TopBar({ page }: any) {

  const { setSaved, edges, saved } = useContext(FlowContext);
  const { setShowProject } = useContext(Context);

  function leaveThisPage() {
    saveChanges(false);
    document.cookie = 'project_id=0';
    setShowProject(false);
    resetItems();
  }

  function updateText(failed: boolean) {
    const text_save = document.getElementById('text-save');

    if (!failed) {
      setSaved('Saved');
      (text_save as HTMLElement).style.color = 'green';
    } else {
      setSaved('Failed Saving');
      (text_save as HTMLElement).style.color = 'red';
    }

    setTimeout(() => {
      setSaved('');
    }, 5000)
  }

  function saveChanges(shouldShowChanges: boolean) {
    saveFile(edges)
      .then(res => shouldShowChanges ? updateText(false) : false)
      .catch(err => shouldShowChanges ? updateText(true) : false)
  }

  return (
    <>
      <div className='dashboard hover' onClick={leaveThisPage}>
        <h2>Dashboard</h2>
      </div>
      <div className='save' onClick={() => saveChanges(true)}></div>
      <h3 id='text-save'>{saved}</h3>
      <h3 className='currentPage'>{page}</h3>
    </>
  )
}

export default TopBar;