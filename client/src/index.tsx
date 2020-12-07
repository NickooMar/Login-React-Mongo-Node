import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './Pages/Context'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css";

ReactDOM.render(
  <React.StrictMode>
      <Context>
        <App />
      </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
