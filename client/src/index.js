import React              from 'react';
import ReactDOM           from 'react-dom';
import App                from './AppComponent/App';
import reportWebVitals    from './cr-react-app-files/reportWebVitals';
import * as serviceWorker from './cr-react-app-files/serviceWorker';
import './static/css/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();

serviceWorker.register();