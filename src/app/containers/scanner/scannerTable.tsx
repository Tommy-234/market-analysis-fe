import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { createChart, PriceFormat } from 'lightweight-charts';
import { isEmpty, endsWith, last } from 'lodash';
import { IntervalType } from '@tommy_234/live-data';
import { useActions, BTChistoryData } from '../../redux';
import { ChartCandle, countDecimals, DollarPriceFormat } from '../../common';
import { DataTable } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

const getPriceFormat = ( symbol: string, candle: ChartCandle ): PriceFormat => {
  if (endsWith(symbol, 'BTC')) {
    const precision = countDecimals(candle.close);
    return {
      type: 'price',
      precision,
      minMove: (1 / Math.pow(10, precision))
    }
  } else {
    return DollarPriceFormat
  }
}

export const ScannerTable = () => {
  const [showChart, setShowChart] = useState('');
  const actions = useActions({ BTChistoryData });
  const chartRef = useRef<HTMLDivElement>();
  
  const { tableData, fields, modalData } = useSelector( (store: any) => ({
    tableData: store.binanceScanner.tableData,
    fields: store.binanceScanner.columns,
    modalData: store.modalChart.chartData
  }));

  useEffect( () => {
    !isEmpty(showChart) && actions.BTChistoryData(showChart, IntervalType.Hour1);
  }, [showChart])

  useEffect( () => {
    if (chartRef.current && !isEmpty(modalData)) {
      const chart = createChart(chartRef.current, {
        width: 600,
        height: 300
      });
      const candleSeries = chart.addCandlestickSeries({
        priceFormat: getPriceFormat(showChart, last(modalData))
      });
      chart.timeScale().applyOptions({ timeVisible: true });
      candleSeries.setData(modalData);
    }
  }, [modalData])
  
  return (
    <div className="container">
      <DataTable
        dataFields={fields}
        tableData={tableData}
        onRowClick={ ( _, row ) => setShowChart(row.symbol) }
      />
      <Modal show={!isEmpty(showChart)} onHide={ () => setShowChart('') }>
        <Modal.Header closeButton>
          <Modal.Title>{showChart}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={chartRef} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
