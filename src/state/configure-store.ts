import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer';
import rootSaga from './saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) ||
    compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
