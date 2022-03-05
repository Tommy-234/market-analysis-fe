import { WatchList, Scanner } from './containers';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => (
  <Tabs defaultActiveKey="watchlist" id="analysis-tabs" className="mb-3">
    <Tab eventKey="watchlist" title="Watchlist">
      <WatchList />
    </Tab>
    <Tab eventKey="scanner" title="Scanner">
      <Scanner />
    </Tab>
  </Tabs>
);
