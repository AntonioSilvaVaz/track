function ColorPicker() {

  const colors = [
    '#FFFFFF', '#FF0000', '#FFC700', '#24FF00', '#00A3FF', '#6100FF', '#40037D', '#FF00F5', '#570000',
    '#7D6200', '#523131', '#380D0D', '#00FF94', '#BA7272', '#044416', '#000000'
  ]

  const handleDrag = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  const allBoxes = colors.map((color: string) => {
    return (
      <div className="color-box" key={color}
        style={{ backgroundColor: color }}
        onDragStart={(e) => handleDrag(e, color)}
        draggable>

      </div>
    )
  })

  const horizontalBoxes = colors.map((color: string) => {
    return (
      <div className="horizontal-colors" key={color}
        style={{ backgroundColor: color }}
        onDragStart={(e) => handleDrag(e, color)}
        draggable>

      </div>
    )
  })

  return (
    <>
      <div className="color-picker">
        {allBoxes}
      </div>

      <div className="color-horizontal">
        {horizontalBoxes}
      </div>
    </>
  )

}

export default ColorPicker;