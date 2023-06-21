import { useCallback, useState } from "react";
import { changeColor, mergeColor, switchColor } from "../../utils/ColorUtils";

function ColorPicker() {

  const [colorMerge, setColorMerge] = useState('#380D0D');

  const [colors, setColors] = useState([
    '#0038FF', '#00C2FF', '#00FFC2', '#24FF00', '#3F0899', '#540303', '#56008B', '#5E003E', '#777777',
    '#8F00FF', '#CCFF00', '#FF002E', '#FF00D6', '#FF7A00', '#FF9393', '#FFC700', '#FFE977', '#FFFFFF'
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

      <div className="colors-container">

        <div className="color-picker">
          {allBoxes}
        </div>

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
          <input type="text" value={colorMerge} onChange={(e) => changeColor(e, setColorMerge)} />
        </div>
      </div>
    </>
  )

}

export default ColorPicker;