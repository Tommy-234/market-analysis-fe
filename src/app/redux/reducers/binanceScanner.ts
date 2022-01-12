import { Info24Hour } from '@tommy_234/live-data';
import { DefualtScannerColumns } from '../../common';

type BinanceScannerState = {
  btcPairs: {
    inProgress: boolean;
    data: Info24Hour[];
    error?: any;
  };
  columns: string[];
}

export const binanceScanner = ( 
  state: BinanceScannerState = {
    btcPairs: {
      inProgress: false,
      data: [],
    },
    columns: DefualtScannerColumns
  },
  action
) => {
  switch(action.type) {
    case 'BINANCE_SCANNER_COLUMNS':
      return {
        ...state,
        columns: action.data
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
      return {
        ...state,
        btcPairs: {
          ...state.btcPairs,
          inProgress: false,
          data: action.data as Info24Hour[]
        }
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
