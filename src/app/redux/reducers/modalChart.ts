import { Candle } from '@tommy_234/live-data';
import { UTCTimestamp } from "lightweight-charts";
import { map } from 'lodash';
import { ChartCandle, removeMillisec } from '../../common';

const candleMapper = ( candles: Candle[] ): ChartCandle[] =>
  map(candles, candle => ({
    time: removeMillisec(candle.openTime) as UTCTimestamp,
    open: candle.open,
    high: candle.high,
    low: candle.low,
    close: candle.close
  }));

export type ModalChartState = {
  historyData: {
    data: Candle[];
    inProgress: boolean;
    error?: any;
  };
  chartData: ChartCandle[]
}

export const modalChart = ( 
  state: ModalChartState = {
    historyData: {
      data: [],
      inProgress: false
    },
    chartData: []
  },
  action: {
    type: string;
    data: any;
  }
) => {
  switch(action.type) {
    case 'BINANCE_HISTORY_START':
      return {
        historyData: {
          data: [],
          inProgress: true
        }
      }
    case 'BINANCE_HISTORY':
      const candles = action.data as Candle[]
      return {
        historyData: {
          inProgress: false,
          data: candles
        },
        chartData: candleMapper(candles)
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
