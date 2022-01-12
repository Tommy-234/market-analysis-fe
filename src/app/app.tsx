import { useActions, initBinance, BTCtickersInfo } from './redux';
import { WatchList, Scanner } from './containers';
import { Tabs, Tab } from 'react-bootstrap';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Scanner />
      </Tab>
    </Tabs>
  );
};
