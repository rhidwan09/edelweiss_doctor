import {createStore} from 'redux';
import reducers from './reducers';

// This connects the reducer to the store
export default function configureStore() {
  let store = createStore(reducers);

  return store;
}
