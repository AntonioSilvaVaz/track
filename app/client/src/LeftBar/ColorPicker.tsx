import { useCallback, useState } from "react";
import { changeColor, createMergedColor, mergeColor, switchColor } from "../utils/ColorUtils";

function ColorPicker() {

  const [colorMerge, setColorMerge] = useState('#000000');

  const [colors, setColors] = useState([
    '#FFFFFF', '#FF0000', '#FFC700', '#24FF00', '#00A3FF', '#6100FF', '#40037D', '#FF00F5', '#570000',
    '#7D6200', '#523131', '#380D0D', '#00FF94', '#BA7272', '#044416', '#000000'
  ]);

  const [horizontalColors, setHorizontalColors] = useState([
    '#FFFFFF', '#FF0000', '#FFC700', '#24FF00', '#00A3FF', '#6100FF', '#40037D', '#FF00F5', '#570000',
    '#7D6200', '#523131', '#380D0D', '#00FF94', '#BA7272', '#044416', '#000000'
  ]);

  const handleDrag = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // RETURNS ALL OF COLORS AS AN ELEMENT
  const allBoxes = colors.map((color: string, index: number) => {
    return (
      <div className="color-box" key={index}
        style={{ backgroundColor: color }}
        onDragStart={(e) => handleDrag(e, color)}
        onDragOver={onDragOver}
        onDrop={(e) => switchColor(e, index, setColors, colors)}
        draggable>
      </div>
    )
  });

  // RETURNS ALL OF THE HORIZONTAL COLORS AS AN ELEMENT
  const horizontalBoxes = horizontalColors.map((color: string, index: number) => {
    return (
      <div className="horizontal-colors" key={index}
        style={{ backgroundColor: color }}
        onDragStart={(e) => handleDrag(e, color + 'horizontal')}
        onDragOver={onDragOver}
        onDrop={(e) => switchColor(e, index, setHorizontalColors, colors)}
        draggable
      >

      </div>
    )
  });

  return (
    <>
      <div className="color-picker">
        {allBoxes}
      </div>

      <div>
        <div className="color-horizontal">
          {horizontalBoxes}
        </div>

        <div className="merge-colors"
          style={{ backgroundColor: colorMerge }}
          draggable
          onDrop={(e) => mergeColor(e, colorMerge, setColorMerge)}
          onDragOver={onDragOver}
          onDragStart={(e) => handleDrag(e, colorMerge)}
        >
          <input type="text" value={colorMerge} onChange={(e)=>changeColor(e, setColorMerge)} />
          {/* <h2>{colorMerge}</h2> */}
        </div>
      </div>



    </>
  )

}

export default ColorPicker;