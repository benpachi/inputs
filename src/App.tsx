import Config from './config/Config';
import Canvas from './display/Canvas';
import { ItemsProvider } from './context/ItemsContext';

function App() {
  return (
    <ItemsProvider>
      <section className='flexrow app'>
        <Canvas />
        <Config />
      </section>
    </ItemsProvider>
  );
}
export default App;