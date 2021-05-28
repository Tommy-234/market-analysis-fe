import { 
  BinanceAnalysis,
  StreamType,
  IntervalType,
  IndicatorType
} from '@tommy_234/live-data';
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { map } from 'lodash';
import axios from 'axios';
import { getSubscription } from '../sw-register';
import 'bootstrap/dist/css/bootstrap.min.css';

const config = {
  apiConfig: {
    endpoint: '/api/binance',
    apiKey: '',
    secretKey: ''
  },
  streamConfig: {
    endpoint: 'wss://stream.binance.com:9443/stream'
  }
}

export const IndicatorTable = () => {
  const [tableData, setTableData] = useState([]);

  const binanceAnalysis = new BinanceAnalysis({
    onUpdate: (data: any) => onUpdate(data),
    config
  });
  
  const onUpdate = (data: any) => {
    setTableData(
      map(data, element => 
        ({
          stream: element.stream,
          current: element.currentCandle.close,
          ...element.indicators
        })
      )
    );
  }

  const newNotification = async () => {
    const subscription = await getSubscription();
    const payload = {
      streamName: 'btcusdt@kline_5m',
      dataPath: 'currentCandle.close',
      operator: 'GreaterThan',
      value: 38400,
      subscription
    }
    axios.post('/api/notification', payload)
      .then( (res) => {
        console.log(res.data);
      })
      .catch( (error) => {
        console.log(error.response.data);
      })
    ;
  }
  
  useEffect(() => {
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.RSI, 14);
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 50);
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 100);
    binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Minute5)
      .then( () => binanceAnalysis.resetStream());
    // binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Hour1)
    //   .then( () => binanceAnalysis.resetStream());
  }, [])

  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  return (
    <div className="container">
      <Table className="table table-striped table-hover w-75 mt-2">
        <thead>
          <tr className="thead-dark">
            {map(columns, column =>
              <th>{column}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {map(tableData, (data, index) => 
            <tr id={`data-row-${index}`} className='table-data-row'>
              {map(columns, column =>
                <td>{data[column]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
      <Button onClick={ () => newNotification() }>
        Test newNotification()
      </Button>
    </div>
  )
}