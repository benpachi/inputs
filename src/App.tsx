import Config from './config/Config';
import Canvas from './display/Canvas';
import { ItemsProvider } from './context/ItemsContext';
import { GamepadsProvider } from './context/GamepadsContext';
import GamepadConfig from './config/GamepadConfig';

function App() {
  return (
    <ItemsProvider>
      <GamepadsProvider>
        <section className='layout-flexrow'>
          <section className='layout-flexcol'>
            <Canvas />
            <GamepadConfig />
          </ section>
          <Config />
        </ section>
      </GamepadsProvider>
    </ItemsProvider>
  );
}
export default App;