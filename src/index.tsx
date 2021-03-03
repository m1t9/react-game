import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let fscrean = false;
window.addEventListener('keydown', (event) => {
  if (event.key === 'f') {
    if (!fscrean) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    fscrean = !fscrean;
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
