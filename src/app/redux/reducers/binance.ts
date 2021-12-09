import { BinanceAnalysis } from '@tommy_234/live-data';

type BinanceState = {
  manager: BinanceAnalysis;
  btcPairs: {
    inProgress: boolean;
    data: any[];
    error?: any;
  };
  data: any[];
}

export const binance = ( 
  state: BinanceState = {
    manager: {} as BinanceAnalysis,
    btcPairs: { inProgress: false, data: [] },
    data: []
  },
  action
) => {
  console.log('binance reducer, action.type = ', action.type);
  switch(action.type) {
    case 'BINANCE_ANLAYSIS_CREATE':
      return {
        ...state,
        manager: action.data
      };
    case 'BINANCE_DATA_UPDATE':
      return {
        ...state,
        data: action.data
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
          data: action.data
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
