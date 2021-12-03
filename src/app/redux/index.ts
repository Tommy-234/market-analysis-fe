import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

export const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export * from './actions';
