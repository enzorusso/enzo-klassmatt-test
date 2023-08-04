import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import TodoList from './containers/TodoList';

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<header></header>
			<div className="app-body">
				<TodoList></TodoList>
			</div>
		</div>
	);
}

export default App;
