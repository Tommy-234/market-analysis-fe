import { Dispatch } from 'redux';
import { BinanceAnalysis } from '@tommy_234/live-data';
import { concat } from 'lodash';

export const addScannerColumn = (
  values: { column: string }
) => (
  dispatch: Dispatch,
  getState: () => any
) => 
  dispatch({
    type: 'BINANCE_SCANNER_COLUMNS',
    data: concat(getState().binanceScanner.columns, values.column)
  });


export const BTCtickersInfo = () => async (
  dispatch: Dispatch,
  getState: () => any
) => {
  dispatch({ type: 'BINANCE_BTC_PAIRS_START' });
  const binanceAnalysis: BinanceAnalysis = getState().binance.manager;
  binanceAnalysis.apiClient.bitcoinPairings()
    .then( (data) => dispatch({
      type: 'BINANCE_BTC_PAIRS',
      data
    }))
    .catch( error => dispatch({
      type: 'BINANCE_BTC_PAIRS_ERROR',
      data: error
    }));
}