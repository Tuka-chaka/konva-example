import './App.css'

import { Stage, Layer, Rect, Circle, Star } from 'react-konva';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import { Tools } from './enums';
import { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

type Shape = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: Tools
}

function App() {

  const [tool, setTool] = useState<Tools | undefined>()
  const [shapes, setShapes] = useState<Shape[]>([])
  const [shapeCount, setShapeCount] = useState<number>(0)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [currentShape, setCurrentShape] = useState<Shape | undefined>()


  useEffect(() => {
    console.log(shapes)
  },[shapes])

  const handleToolSelected = (tool:Tools) => {
    setTool(tool)
  }

  const handleDragEnd = (shape:Shape, e: KonvaEventObject<DragEvent, Node<NodeConfig>>) => {
    setShapes(shapes =>
      [...shapes.filter(item => item.id !== shape.id),
        {...shape, x:e.target.x(), y:e.target.y()}])
  }

  const handleDragStart = (shape:Shape) => {
    setShapes(shapes =>
      [...shapes.filter(item => item.id !== shape.id), shape])
  }

  const handleCanvasClicked = (event: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => {
    if (tool !== Tools.HAND && tool !== undefined) {
      setShapeCount(count => count + 1)
      const {x,y} = event.currentTarget.getRelativePointerPosition()!
      setShapes(shapes => [...shapes, {id: shapeCount, x: x, y: y, width: 50, height: 50, type: tool}])
    }
  }

  return (
      <div>
        
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={(e) => handleCanvasClicked(e)}>
          <Layer>
            {shapes.map(shape => {
              switch (shape.type) {
                case Tools.SQUARE: return <Rect key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke='black'
                strokeWidth={4}
                draggable={tool === Tools.HAND}
                onDragStart={() => handleDragStart(shape)}
                onDragEnd={(e) => handleDragEnd(shape, e)}
                />
                case Tools.CIRCLE: return <Circle key={shape.id}
                x={shape.x}
                y={shape.y}
                radius={50}
                stroke='black'
                strokeWidth={4}
                draggable={tool === Tools.HAND}
                onDragStart={() => handleDragStart(shape)}
                onDragEnd={(e) => handleDragEnd(shape, e)}
                />
                case Tools.TRIANGLE: return <Star key={shape.id}
                x={shape.x}
                y={shape.y}
                numPoints={3}
                innerRadius={25}
                outerRadius={50}
                stroke='black'
                strokeWidth={4}
                draggable={tool === Tools.HAND}
                onDragStart={() => handleDragStart(shape)}
                onDragEnd={(e) => handleDragEnd(shape, e)}/>
              }
            })}
          </Layer>
        </Stage>
        <Sidebar selectedTool={tool} onToolSelect={handleToolSelected}></Sidebar>
      </div>
  )
}

export default App
