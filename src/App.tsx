import { useState } from 'react'
import Config from './Config';
import Display from './Display';

function App() {
  const [elements, setElements] = useState([]);

  return (
    <div className='flox'>
      <Display />
      <Config />      
    </div>
  );
}
export default App;
