import Config from './config/Config';
import Canvas from './display/Canvas';
import { DisplayProvider } from './context/DisplayContext';

function App() {
  return (
    <DisplayProvider>
      <section className='flexrow app'>
        <Canvas />
        <Config />
      </section>
    </DisplayProvider>
  );
}
export default App;