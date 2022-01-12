import { ScannerTable } from './scannerTable';
import { SidePanel } from './sidePanel';

export const Scanner = () => (
  <div className='container-fluid d-flex flex-row'>
    <SidePanel />
    <ScannerTable />
  </div>
);
