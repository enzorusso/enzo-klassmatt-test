import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


function App() {
  const addToDo = () => {
    console.log('chegou');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='Content'>
        <p>LEMBRETES</p>
        <div className='List'>
          <p className='None'> Nenhum lembrete disponível. </p>
          <button className='Add-button' onClick={addToDo}>
            <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>&nbsp;
              Novo Lembrete
          </button>
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
