import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>LEMBRETES</p>
        <div className='List'>
          <p className='None'> Nenhum lembrete disponível. </p>
          <button className='Add-button'>
            <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>&nbsp;
              Novo Lembrete
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
