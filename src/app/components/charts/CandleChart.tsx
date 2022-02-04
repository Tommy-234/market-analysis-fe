import { FC, useEffect, useRef } from 'react';
import { createChart, LineStyleOptions, IChartApi } from 'lightweight-charts';
import { isEmpty, last, forEach }  from 'lodash';
import { mapSeriesCandles, getPriceFormat, mapSeriesVolume, calcSeriesSMA } from './utils';

type LineSeries = {
  count: number;
  options: Partial<LineStyleOptions>;
}

type CandleChartProps = {
  symbol: string;
  data: any[];
  lineSeries?: LineSeries[];
  volume?: boolean;
};

export const CandleChart: FC<CandleChartProps> = ({
  symbol,
  data,
  lineSeries,
  volume = false
}) => {
  const chartRef = useRef<HTMLDivElement>();

  useEffect( () => {
    if (chartRef.current && !isEmpty(data)) {
      const chart = createChart(chartRef.current, { width: 450, height: 300 });
      const candleSeriesData = mapSeriesCandles(data);
      const candleSeriesChart = chart.addCandlestickSeries({
        priceFormat: getPriceFormat(symbol, last(candleSeriesData))
      });
      chart.timeScale().applyOptions({ timeVisible: true });
      candleSeriesChart.setData(candleSeriesData);
      volume && addVolumeHistogram(chart);
      !isEmpty(lineSeries) && addLineSeries(chart);
    }
  }, [data]);

  const addVolumeHistogram = ( chart: IChartApi ) => {
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume'
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    });
    volumeSeries.setData(mapSeriesVolume(data));
  };

  const addLineSeries = ( chart: IChartApi ) =>
    forEach(lineSeries, series => {
      const chartLineSeries = chart.addLineSeries(series.options);
      chartLineSeries.setData(calcSeriesSMA(data, series.count));
    });

  return (
    <div ref={chartRef} />
  );
};
