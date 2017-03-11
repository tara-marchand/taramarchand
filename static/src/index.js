import { AppContainer } from 'react-hot-loader';
import '../../node_modules/semantic-ui/dist/semantic.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <AppContainer>
     <App />
  </AppContainer>,
  document.getElementById('root')
);