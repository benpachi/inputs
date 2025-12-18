import { useState } from 'react'
import Config from './Config';
import Display from './Display';

function App() {
  const [elements, setElements] = useState([]);

  return (
    <section className='flox'>
      <Display />
      <Config />      
    </section>
  );
}
export default App;
