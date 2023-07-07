import { useContext } from "react";
import { FlowContext } from '../../Context/context';

import { toPng, toJpeg, toSvg } from 'html-to-image';
import download from "downloadjs";

import './Render.css';


async function exportFile(toWhat: 'png' | 'svg' | 'jpeg', projectName: string) {
  const node = document.getElementsByClassName('Flow')[0];
  const nodeAsHtml = (node as HTMLElement);

  if (!node) return;
  try {
    let dataUrl;
    let end: string;

    if (toWhat === 'png') {
      dataUrl = await toPng(nodeAsHtml);
      end = 'png';
    } else if (toWhat === 'svg') {
      dataUrl = await toSvg(nodeAsHtml);
      end = 'svg';
    } else if (toWhat === 'jpeg') {
      dataUrl = await toJpeg(nodeAsHtml);
      end = 'jpeg';
    }
    else return;
    download(dataUrl, `track-${projectName}.${end}`);
  } catch (error) {
    alert('Something went wrong');
  }
}

function Render({ projectName }: { projectName: string }) {

  const { setShowExport } = useContext(FlowContext);

  return (
    <div id="render">
      <div className='options'>
        <button className='close' onClick={() => setShowExport(false)}>
          <h3>X</h3>
        </button>

        <div className='export-options'>
          <h3>SVG:</h3>
          <button className='export-btn' onClick={() => exportFile('svg', projectName)}>
            <h4>Export as SVG</h4>
          </button>
        </div>

        <div className='export-options'>
          <h3>PNG:</h3>
          <button className='export-btn' onClick={() => exportFile('png', projectName)}>
            <h4>Export as PNG</h4>
          </button>
        </div>

        <div className='export-options'>
          <h3>JPEG:</h3>
          <button className='export-btn' onClick={() => exportFile('jpeg', projectName)}>
            <h4>Export as JPEG</h4>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Render;