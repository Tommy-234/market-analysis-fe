import { 
  BinanceAnalysis,
  StreamType,
  IntervalType,
  IndicatorType
} from '@tommy_234/live-data';
import { Dispatch } from 'redux';
import { map } from 'lodash';
import { BinanceConfig } from '../../common';

export const newBinanceIndicator = (
  values: {
    type: IndicatorType,
    count: number
  }
) => (
  _: Dispatch,
  getState: () => any
) => {
  const binanceAnalysis = getState().binance.manager;
  binanceAnalysis.streamManager.newGlobalIndicator(values.type, values.count);
}

export const newBinanceStream = (
  values: {
    ticker: string,
    interval: IntervalType
  }
) => (
  _: Dispatch,
  getState: () => any
) => {
  const binanceAnalysis = getState().binance.manager;
  binanceAnalysis.newStream(values.ticker, StreamType.KLINE, values.interval)
    .then( () => binanceAnalysis.resetStream());
}

export const initBinance = () => (
  dispatch: Dispatch
) => {
  const binanceAnalysis = new BinanceAnalysis({
    onUpdate: ( data: any ) => dispatch({
      type: 'BINANCE_DATA_UPDATE',
      data: mapBinanceStreamData(data)
    }),
    config: BinanceConfig
  });
  binanceDummyData(binanceAnalysis);
  dispatch({
    type: 'BINANCE_ANLAYSIS_CREATE',
    data: binanceAnalysis
  });
}

const mapBinanceStreamData = ( data: any ) =>
  map(data, element =>  ({
    stream: element.stream,
    current: element.currentCandle.close,
    ...element.indicators
  }));


const binanceDummyData = ( binanceAnalysis: BinanceAnalysis ) => {
  binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.RSI, 14);
  binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 50);
  binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 100);
  binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Minute5)
    .then( () => binanceAnalysis.resetStream());
  binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Hour1)
    .then( () => binanceAnalysis.resetStream());
};