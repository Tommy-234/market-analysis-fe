import { Candle } from '@tommy_234/live-data';

export type ModalChartState = {
  historyData: {
    data: Candle[];
    inProgress: boolean;
    error?: any;
  };
}

export const modalChart = ( 
  state: ModalChartState = {
    historyData: {
      data: [],
      inProgress: false
    }
  },
  action: {
    type: string;
    data: any;
  }
) => {
  switch(action.type) {
    case 'BINANCE_HISTORY_CLEAR':
      return {
        historyData: {
          data: [],
          inProgress: false
        }
      }
    case 'BINANCE_HISTORY_START':
      return {
        historyData: {
          data: [],
          inProgress: true
        }
      }
    case 'BINANCE_HISTORY':
      return {
        historyData: {
          inProgress: false,
          data: action.data as Candle[]
        }
      }
    case 'BINANCE_HISTORY_ERROR':
      return {
        historyData: {
          inProgress: false,
          error: action.data
        }
      }
    default:
      return state;
  }
}
