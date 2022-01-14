import { Dispatch } from 'redux';
import { reduce, filter, get } from 'lodash';
import { BinanceAnalysis, Info24Hour, Operator } from '@tommy_234/live-data';
import { Filter } from '../reducers/binanceScanner';

const applyFilter = (BTCpair: Info24Hour, filter: Filter) => {
  const value = get(BTCpair, filter.field);
  return filter.operator === Operator.GREATER_THAN ?
    (value > filter.target ? true : false) :
    (value < filter.target ? true : false);
};

export const scannerFilterApply = (
  values: { filters: Filter[] }
) => (
  dispatch: Dispatch,
  getState: () => any
) => {
  const BTCpairs = getState().binanceScanner.btcPairs.data as Info24Hour[];
  const filtered = reduce(
    values.filters,
    (result, scannerFilter) => 
      filter(result, BTCpair => applyFilter(BTCpair, scannerFilter) ),
    BTCpairs
  );

  dispatch({
    type: 'BINANCE_SCANNER_TABLE_DATA',
    data: filtered
  });
};

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