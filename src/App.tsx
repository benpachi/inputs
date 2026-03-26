import Config from './config/Config';
import Canvas from './display/Canvas';
import { ItemsProvider } from './context/ItemsContext';
import { GamepadsProvider } from './context/GamepadsContext';

function App() {
  return (
    <ItemsProvider>
      <GamepadsProvider>
        <section className='flexrow app'>
          <Canvas />
          <Config />
        </section>
      </GamepadsProvider>
    </ItemsProvider>
  );
}
export default App;