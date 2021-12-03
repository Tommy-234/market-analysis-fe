import { 
  BinanceAnalysis,
  StreamType,
  IntervalType,
  IndicatorType
} from '@tommy_234/live-data';
import { binanceInit, tableDataUpdate } from './redux';
import { useDispatch } from 'react-redux';
import { IndicatorTable, SidePanel } from './containers';
import { useEffect } from 'react';
import { map } from 'lodash';
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

let App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const binanceAnalysis = new BinanceAnalysis({
      onUpdate: (data: any) => dispatch(tableDataUpdate(
        map(data, element =>  ({
          stream: element.stream,
          current: element.currentCandle.close,
          ...element.indicators
        }))
      )),
      config
    });
    
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.RSI, 14);
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 50);
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 100);
    binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Minute5)
      .then( () => binanceAnalysis.resetStream());
    binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Hour1)
      .then( () => binanceAnalysis.resetStream());

    dispatch(binanceInit(binanceAnalysis));
  }, [])

  return (
    <div className='container-fluid d-flex flex-row'>
      <SidePanel />
      <IndicatorTable />
    </div>
  );
}

export default App;