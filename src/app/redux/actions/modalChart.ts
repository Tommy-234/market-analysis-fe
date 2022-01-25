import { Dispatch } from 'redux';
import { BinanceAnalysis, IntervalType } from '@tommy_234/live-data';

export const BTChistoryData = ( symbol: string, interval: IntervalType ) => async (
  dispatch: Dispatch,
  getState: () => any
) => {
  dispatch({ type: 'BINANCE_HISTORY_START' });
  const binanceAnalysis: BinanceAnalysis = getState().binance.manager;
  binanceAnalysis.apiClient.historicData({ interval, symbol, limit: 200 })
    .then( (data) => dispatch({
      type: 'BINANCE_HISTORY',
      data
    }))
    .catch( error => dispatch({
      type: 'BINANCE_HISTORY_ERROR',
      data: error
    }));
}