import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import ListComponent from './components/ListComponent';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ListComponent></ListComponent>
      </header>
    </div>
  );
}

export default App;
