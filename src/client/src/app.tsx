import { 
  BinanceAnalysis,
  StreamType,
  IntervalType,
  IndicatorType
} from '@tommy_234/live-data';
import { binanceInit, tableDataUpdate } from './redux';
import { connect } from 'react-redux'
import IndicatorTable from './IndicatorTable';
import { SidePanel } from './SidePanel';
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

let App = ( props ) => {
  const { binanceInit, onBinanceupdate } = props;

  useEffect(() => {
    const binanceAnalysis = new BinanceAnalysis({
      onUpdate: (data: any) => onBinanceupdate(data),
      config
    });
    
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.RSI, 14);
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 50);
    binanceAnalysis.streamManager.newGlobalIndicator(IndicatorType.MovingAverage, 100);
    binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Minute5)
      .then( () => binanceAnalysis.resetStream());
    binanceAnalysis.newStream('BTCUSDT', StreamType.KLINE, IntervalType.Hour1)
      .then( () => binanceAnalysis.resetStream());

    binanceInit(binanceAnalysis);
  }, [])

  return (
    <div className='container-fluid d-flex flex-row'>
      <SidePanel />
      <IndicatorTable />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  onBinanceupdate: (data) => dispatch(tableDataUpdate(
    map(data, element =>  ({
        stream: element.stream,
        current: element.currentCandle.close,
        ...element.indicators
    }))
  )),
  binanceInit: ( ba: BinanceAnalysis ) => dispatch(binanceInit(ba))
});

App = connect(null, mapDispatchToProps)(App)

export default App;