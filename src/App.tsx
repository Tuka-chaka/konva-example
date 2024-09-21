import './App.css'

import { Stage, Layer, Rect, Circle, Star } from 'react-konva';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
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

  const [tool, setTool] = useState<Tools | undefined>(undefined)
  const [shapes, setShapes] = useState<Shape[]>([])
  const [shapeCount, setShapeCount] = useState<number>(0)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [currentShape, setCurrentShape] = useState<Shape | undefined>()
  

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

  const handleStartDrawing = (event: KonvaEventObject<PointerEvent, Node<NodeConfig>>) => {
    if (tool !== Tools.HAND && tool !== undefined) {
      const {x,y} = event.currentTarget.getRelativePointerPosition()!
      setIsDrawing(true)
      setShapeCount(count => count + 1)
      setCurrentShape({id: shapeCount, x: x, y: y, width: 0, height: 0, type: tool})
    }
  }

  const handleDrawing = (event: KonvaEventObject<PointerEvent, Node<NodeConfig>>) => {
    if (isDrawing) {
      const {x,y} = event.currentTarget.getRelativePointerPosition()!
      setCurrentShape(currentShape => ({...currentShape!, width: x - currentShape!.x, height: y - currentShape!.y}))
      console.log(currentShape)
      setShapes(shapes => [...shapes.filter(item => item.id !== currentShape!.id), currentShape!])
    }
  }

  const handleStopDrawing = () => {
    console.log('end')
    if (isDrawing) {
    setShapes(shapes => [...shapes.filter(item => item.id !== currentShape!.id), structuredClone(currentShape!)])
    setIsDrawing(false)
    }
  }

  return (
      <div>
        <Stage width={window.innerWidth}
        height={window.innerHeight} 
        onPointerDown={(e) => handleStartDrawing(e)}
        onPointerMove={(e) => handleDrawing(e)}
        onPointerUp={() => handleStopDrawing()}>
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
                radius={Math.max(Math.abs(shape.width), Math.abs(shape.height))}
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
                innerRadius={Math.max(Math.abs(shape.width), Math.abs(shape.height))/2}
                outerRadius={Math.max(Math.abs(shape.width), Math.abs(shape.height))}
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
