import { filter } from 'lodash';
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

export const binanceScanner = ( 
  state: BinanceScannerState = {
    btcPairs: {
      inProgress: false,
      data: [],
    },
    tableData: [],
    columns: DefualtScannerColumns
  },
  action
) => {
  switch(action.type) {
    case 'BINANCE_SCANNER_TABLE_DATA':
      return {
        ...state,
        tableData: action.data as Info24Hour[]
      }
    case 'BINANCE_SCANNER_FILTERS':
      return {
        ...state,
        filters: action.data as Filter[]
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
