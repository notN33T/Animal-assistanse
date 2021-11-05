import React              from 'react';
import ReactDOM           from 'react-dom';
import App                from './App';
import reportWebVitals    from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();

serviceWorker.unregister();