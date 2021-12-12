import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import { configureStore } from './state/configure-store';
import 'semantic-ui-css/semantic.min.css';
import './style/helpers/reset.scss';

ReactDOM.render(
  <Provider store={configureStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
