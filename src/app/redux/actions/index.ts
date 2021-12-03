import { BinanceAnalysis } from '@tommy_234/live-data';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export * from './useActions';

export const binanceInit = ( binanceAnalysis: BinanceAnalysis) => ({
  type: 'BINANCE_ANLAYSIS_CREATE',
  binanceAnalysis
});

export const tableDataUpdate = ( data: Record<string, unknown>[]) => ({
  type: 'TABLE_DATA_UPDATE',
  data
});

export const userLogin = (  values: { username: string; password: string; }) => (
  dispatch: Dispatch
): void => {
  // const dispatch = useDispatch();
  dispatch({ type: 'USER_LOGIN_START' });

  axios.post('/api/user/login', values)
    .then( (res) => {
      dispatch({
        type: 'USER_LOGIN',
        data: res.data
      });
    })
    .catch( (error) => {
      dispatch({
        type: 'USER_LOGIN_ERROR',
        data: error
      });
    });
};

export const userLogout = () => ({ type: 'USER_LOGOUT' });
