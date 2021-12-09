import { useActions, initBinance, BTCtickersInfo } from './redux';
import { IndicatorTable, SidePanel, ScannerTable } from './containers';
import { Tabs, Tab } from 'react-bootstrap';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WatchList = () => {
  
  return (
    <div className='container-fluid d-flex flex-row'>
      <SidePanel />
      <IndicatorTable />
    </div>
  );
};



export const App = () => {
  const actions = useActions({ initBinance, BTCtickersInfo });

  useEffect(() => {
    actions.initBinance();
    actions.BTCtickersInfo();
  }, []);

  return (
    <Tabs defaultActiveKey="watchlist" id="analysis-tabs" className="mb-3">
      <Tab eventKey="watchlist" title="Watchlist">
        <WatchList />
      </Tab>
      <Tab eventKey="scanner" title="Scanner">
        <ScannerTable />
      </Tab>
    </Tabs>
  );
};
