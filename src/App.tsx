import './App.css'

import { Stage, Layer, Rect, Circle, Star } from 'react-konva';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import { Tools } from './enums';
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

type Shape = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: Tools
}

function App() {

  const [tool, setTool] = useState<Tools | undefined>()
  const [shapes, setShapes] = useState<Shape[]>([])

  const handleToolSelected = (tool:Tools) => {
    setTool(tool)
  }

  const handleCanvasClicked = (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => {
    if (tool !== Tools.HAND && tool !== undefined) {
      const {x,y} = event.currentTarget.getRelativePointerPosition()!
      setShapes(shapes => [...shapes, {x: x, y: y, width: 50, height: 50, type: tool}])
    }
  }

  return (
      <div>
        
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={(e) => handleCanvasClicked(e)}>
          <Layer>
            {shapes.map(shape => {
              switch (shape.type) {
                case Tools.SQUARE: return <Rect
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill="red"
                shadowBlur={10}
                draggable={tool === Tools.HAND}
                />
                case Tools.CIRCLE: return <Circle
                x={shape.x}
                y={shape.y}
                radius={50}
                fill="green"
                draggable={tool === Tools.HAND}/>
                case Tools.TRIANGLE: return <Star
                x={shape.x}
                y={shape.y}
                numPoints={3}
                innerRadius={25}
                outerRadius={50}
                fill="yellow"
                draggable={tool === Tools.HAND}/>
              }
            })}
          </Layer>
        </Stage>
        <Sidebar selectedTool={tool} onToolSelect={handleToolSelected}></Sidebar>
      </div>
  )
}

export default App
