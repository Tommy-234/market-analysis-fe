import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { isEmpty, isEqual } from 'lodash';
import { IntervalType } from '@tommy_234/live-data';
import { useActions, BTChistoryData, clearHistory } from '../../redux';
import { DataTable, CandleChart } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ScannerTable = () => {
  const [showChart, setShowChart] = useState('');
  const actions = useActions({ BTChistoryData, clearHistory });
  
  // second parameter 'isEqual' is to prevent rendering on every websocket message.
  const { tableData, fields, historyData } = useSelector( (store: any) => ({
    tableData: store.binanceScanner.tableData,
    fields: store.binanceScanner.columns,
    historyData: store.modalChart.historyData.data
  }), isEqual);

  useEffect( () => {
    !isEmpty(showChart) && actions.BTChistoryData(showChart, IntervalType.Hour1);
  }, [showChart]);

  const closeModal = () => {
    setShowChart('');
    actions.clearHistory();
  }
  
  return (
    <div className="container">
      <DataTable
        dataFields={fields}
        tableData={tableData}
        onRowClick={ ( _, row ) => setShowChart(row.symbol) }
      />
      <Modal show={!isEmpty(showChart)} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{showChart}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CandleChart
            symbol={showChart}
            data={historyData}
            lineSeries={[{
              count: 50,
              options: {
                color: 'blue',
                lineWidth: 1
              }
            }]}
            volume={true}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
