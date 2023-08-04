import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import ListComponent from './components/ListComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <header>
      </header>
      <div className='app-body'>
        <ListComponent></ListComponent>
      </div>
    </div>
  );
}

export default App;
