import { useState } from 'react'
import Config from './config/Config';
import Display from './display/Display';
import type { DisplayItem } from './interface/display-item';

function App() {
  const [elements, setElements] = useState<DisplayItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addElement = (newItem: DisplayItem): number => {
    setElements([...elements, newItem]);
    return elements.length;
  }

  const updateElement = (index: number, updatedItem: DisplayItem) => {
    const nextElements = elements.map((element, i) => i === index ? updatedItem : element);
    setElements(nextElements);
  }

  const removeElement = (removeIndex: number) => {
    const nextElements = elements.filter((_, index) => index !== removeIndex);
    setElements(nextElements);
  }

  const selectElement = (index: number) => {
    setSelectedIndex(index);
  }

  return (
    <section className='flexrow app'>
      <Display elements={elements} selectElement={selectElement} />
      <Config 
        addElement={addElement}
        removeElement={removeElement}
        updateElement={updateElement}
        selectElement={selectElement}
        selectedIndex={selectedIndex}
        elements={elements}
      />      
    </section>
  );
}
export default App;
