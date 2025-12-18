import { useState } from 'react'
import Config from './Config';
import Display from './display/Display';
import { Shape } from './shapes/shape';

function App() {
  const [elements, setElements] = useState<Shape[]>([]);

  const addElement = (newShape: Shape) => {
    setElements([...elements, newShape])
  }

  return (
    <section className='flox'>
      <Display elements={elements}/>
      <Config addElement={addElement}/>      
    </section>
  );
}
export default App;
