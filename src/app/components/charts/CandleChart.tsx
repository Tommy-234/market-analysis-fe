import { FC, useEffect, useRef, useState } from 'react';
import {
  createChart,
  LineStyleOptions,
  IChartApi,
  ChartOptions,
  MouseEventParams
} from 'lightweight-charts';
import { isEmpty, last, forEach }  from 'lodash';
import { Candle } from '@tommy_234/live-data';
import {
  mapSeriesCandles,
  getPriceFormat,
  mapSeriesVolume,
  calcSeriesSMA
} from './utils';

type LineSeries = {
  count: number;
  options: Partial<LineStyleOptions>;
}

type CandleChartProps = {
  chartOptions?: Partial<ChartOptions>;
  symbol: string;
  data: Candle[];
  lineSeries?: LineSeries[];
  volume?: boolean;
  chartOnClick?: ( param: MouseEventParams ) => void;
};

const defaultOptions = {
  width: 450,
  height: 300,
  crosshair: { mode: 0 }
}

export const CandleChart: FC<CandleChartProps> = ({
  symbol,
  data,
  lineSeries,
  volume = false,
  chartOptions = {},
  chartOnClick
}) => {
  const [chartApi, setChartApi] = useState(null);
  const chartRef = useRef<HTMLDivElement>();

  useEffect( () => {
    if (chartRef.current && !isEmpty(data)) {
      // If chart already exists, remove old and re-create
      chartApi && chartApi.remove();
      createCandleChart();
    }
  }, [data]);

  const createCandleChart = () => {
    const chart = createChart(chartRef.current, {...defaultOptions, ...chartOptions} );
    const candleSeriesData = mapSeriesCandles(data);
    const candleSeriesChart = chart.addCandlestickSeries({
      priceFormat: getPriceFormat(symbol, last(candleSeriesData))
    });
    chart.timeScale().applyOptions({ timeVisible: true });
    candleSeriesChart.setData(candleSeriesData);
    volume && addVolumeHistogram(chart);
    !isEmpty(lineSeries) && addLineSeries(chart);
    chartOnClick && chart.subscribeClick(chartOnClick);
    setChartApi(chart);
  }

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
