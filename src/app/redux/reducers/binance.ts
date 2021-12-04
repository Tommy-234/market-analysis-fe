import { BinanceAnalysis } from '@tommy_234/live-data';

type BinanceState = {
  manager: BinanceAnalysis;
  data: any[];
}

export const binance = ( 
  state: BinanceState = {
    manager: {} as BinanceAnalysis,
    data: []
  },
  action
) => {
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
    default:
      return state;
  }
}
