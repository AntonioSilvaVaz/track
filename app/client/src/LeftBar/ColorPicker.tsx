function ColorPicker() {

  const colors = ['red', 'yellow', 'violet', 'black', 'white', 'blue', 'orange', 'grey', 'brown', 'purple', 'wheat', 'green'];

  const handleDrag = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  const allBoxes = colors.map((color: string) => {
    return (
      <div className="color-box" key={color}
        style={{ backgroundColor: color, border: `1px solid black` }}
        onDragStart={(e) => handleDrag(e, color)}
        draggable>

      </div>
    )
  })

  return (
    <>
      {allBoxes}
    </>
  )

}

export default ColorPicker;