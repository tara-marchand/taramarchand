import { AppContainer } from 'react-hot-loader';
import '../../node_modules/semantic-ui/dist/semantic.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

const root = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
     <App />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.render(<App />, root);
  });
}
