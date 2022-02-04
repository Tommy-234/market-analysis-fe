import { Candle } from '@tommy_234/live-data';
import { PriceFormat, UTCTimestamp } from 'lightweight-charts';
import { endsWith, map, reduce, slice } from 'lodash';
import { DollarPriceFormat, ChartCandle, countDecimals, removeMillisec } from '../../common';

export const getPriceFormat = ( symbol: string, candle: ChartCandle ): PriceFormat => {
  if (endsWith(symbol, 'BTC')) {
    const precision = countDecimals(candle.close);
    return {
      type: 'price',
      precision,
      minMove: (1 / Math.pow(10, precision))
    };
  } else {
    return DollarPriceFormat;
  }
};

export const calcSeriesSMA = (data: Candle[], count: number) =>
  map(
    slice(data, count-1),
    (candle, mapIndex) => ({
      time: removeMillisec(candle.openTime) as UTCTimestamp,
      value: reduce(
        slice(data, mapIndex, mapIndex + count),
        (result, c) => result + c.close,
        0
      ) / count
    })
  );

export const mapSeriesVolume = (data: Candle[]) =>
  map(
    data,
    candle => ({
      time: removeMillisec(candle.openTime) as UTCTimestamp,
      value: candle.volume
    })
  );


export const mapSeriesCandles = ( candles: Candle[] ): ChartCandle[] =>
  map(
    candles,
    candle => ({
      time: removeMillisec(candle.openTime) as UTCTimestamp,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close
    })
  );


// export const calcSeriesRSI = (data: ChartCandle[], count: number) =>
//   map(
//     slice(data, count-1),
//     (candle, mapIndex) => ({
//       time: candle.time,
//       value: reduce(
//         slice(data, mapIndex, mapIndex + count - 1),
//         (result, c) => result + c.close,
//         0
//       )
//     })
//   );