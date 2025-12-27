import Config from './config/Config';
import Display from './display/Display';
import { DisplayProvider } from './context/DisplayContext';

function App() {
  return (
    <DisplayProvider>
      <section className='flexrow app'>
        <Display />
        <Config />
      </section>
    </DisplayProvider>
  );
}
export default App;