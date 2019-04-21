import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux/es/components/Provider';
import App from './components/App';
import store from './store';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);
