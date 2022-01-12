import { IndicatorTable } from './indicatorTable';
import { SidePanel } from './sidePanel';

export const WatchList = () => (
  <div className='container-fluid d-flex flex-row'>
    <SidePanel />
    <IndicatorTable />
  </div>
);
