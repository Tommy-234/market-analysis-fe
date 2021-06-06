import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { binanceAnalysis } from './binanceAnalysis';
import { tableData } from './tableData';

export default combineReducers({
  form: reduxFormReducer,
  binanceAnalysis,
  tableData
});
