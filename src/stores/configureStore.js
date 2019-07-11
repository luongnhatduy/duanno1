import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(reactotron, sagaMiddleware) {
  let store;
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    store = reactotron.createStore(rootReducer, applyMiddleware(sagaMiddleware));
  } else {
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  }

  return store;
}
