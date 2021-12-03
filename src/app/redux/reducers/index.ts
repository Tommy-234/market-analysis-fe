import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { binanceAnalysis } from './binanceAnalysis';
import { tableData } from './tableData';
import { user } from './user';

export default combineReducers({
  form: reduxFormReducer,
  binanceAnalysis,
  tableData,
  user
});
