import React, {Component} from 'react';
import {createStore} from 'redux';
import reducers from './src/reducers';
import {Provider} from 'react-redux';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import FlashMessage from 'react-native-flash-message';

// import configureStore from './src/Store.js';
// const store = configureStore();

import Route from './src/Route';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <IconRegistry icons={[EvaIconsPack]} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Route />
        </ApplicationProvider>
        <FlashMessage position="top" />
      </Provider>
    );
  }
}

export default App;
