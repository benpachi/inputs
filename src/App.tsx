import { useState } from 'react'
import Config from './Config';
import Display from './display/Display';
import { Shape } from './shapes/shape';

function App() {
  const [elements, setElements] = useState<Shape[]>([]);
  const [selectedElementIndex, setSelectedElementIndex] = useState(0);

  const addElement = (newShape: Shape) => {
    setElements([...elements, newShape]);
  }

  const selectElement = (index: number) => {
    setSelectedElementIndex(index);
  }

  const updateElementList = (index: number, updatedShape: Shape) => {
    const newElements = [...elements];
    newElements[index] = updatedShape;
    setElements(newElements);
  }

  return (
    <section className='flox'>
      <Display elements={elements} selectElement={selectElement} />
      <Config 
        addElement={addElement}
        updateElementList={updateElementList}
        selectedElement={elements[selectedElementIndex]} 
        selectedElementIndex={selectedElementIndex}
        selectElement={selectElement}
        elements={elements}
      />      
    </section>
  );
}
export default App;
