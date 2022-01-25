import { reduce, filter, get } from 'lodash';
import { Info24Hour, Operator } from '@tommy_234/live-data';
import { DefualtScannerColumns } from '../../common';

export type Filter = {
  field: string;
  target: number;
  operator: Operator;
}

export type BinanceScannerState = {
  btcPairs: {
    inProgress: boolean;
    data: Info24Hour[];
    error?: any;
  };
  tableData: Info24Hour[];
  columns: string[];
  filters?: Filter[];
}

const applyFilter = (BTCpair: Info24Hour, filter: Filter) => {
  const value = get(BTCpair, filter.field);
  return filter.operator === Operator.GREATER_THAN ?
    (value > filter.target ? true : false) :
    (value < filter.target ? true : false);
};

export const binanceScanner = ( 
  state: BinanceScannerState = {
    btcPairs: {
      inProgress: false,
      data: [],
    },
    tableData: [],
    columns: DefualtScannerColumns
  },
  action: {
    type: string;
    data: any;
  }
) => {
  switch(action.type) {
    case 'BINANCE_SCANNER_FILTERS_APPLY':
      return {
        ...state,
        tableData: reduce(
          action.data as Filter[],
          (result, scannerFilter) => 
            filter(result, BTCpair => applyFilter(BTCpair, scannerFilter) ),
          state.btcPairs.data
        )
      }
    case 'BINANCE_SCANNER_COLUMNS_ADD':
      return {
        ...state,
        columns: [...state.columns, action.data as string]
      }
    case 'BINANCE_SCANNER_COLUMNS_REMOVE':
      return {
        ...state,
        columns: filter(state.columns, column => column != action.data)
      }
    case 'BINANCE_BTC_PAIRS_START':
      return {
        ...state,
        btcPairs: {
          ...state.btcPairs,
          inProgress: true
        }
      }
    case 'BINANCE_BTC_PAIRS':
      const data = action.data as Info24Hour[];
      return {
        ...state,
        btcPairs: {
          ...state.btcPairs,
          inProgress: false,
          data
        },
        tableData: data
      }
    case 'BINANCE_BTC_PAIRS_ERROR':
      return {
        ...state,
        btcPairs: {
          ...state.btcPairs,
          inProgress: false,
          error: action.data
        }
      }
    default:
      return state;
  }
}
