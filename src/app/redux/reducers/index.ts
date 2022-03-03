import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { binance } from './binance';
import { binanceScanner } from './binanceScanner';
import { user } from './user';
import { notifications } from './notifications';

export default combineReducers({
  form: reduxFormReducer,
  binance,
  binanceScanner,
  user,
  notifications
});
