import { Dispatch } from 'redux';
import { BinanceAnalysis } from '@tommy_234/live-data';
import { Filter } from '../reducers/binanceScanner';

export const scannerFilterApply = (
  values: { filters: Filter[] }
) => (
  dispatch: Dispatch
) =>
  dispatch({
    type: 'BINANCE_SCANNER_FILTERS_APPLY',
    data: values.filters
  });

export const addScannerColumn = (
  values: { column: string }
) => (
  dispatch: Dispatch
) => 
  dispatch({
    type: 'BINANCE_SCANNER_COLUMNS_ADD',
    data: values.column
  });

export const addRemoveScannerColumn = (
  values: {
    addRemove: string;
    column: string;
  }
) => (
  dispatch: Dispatch
) => 
  dispatch({
    type: values.addRemove != 'remove' ? 'BINANCE_SCANNER_COLUMNS_ADD' : 'BINANCE_SCANNER_COLUMNS_REMOVE',
    data: values.column
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