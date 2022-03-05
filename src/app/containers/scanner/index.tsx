import { useEffect } from 'react';
import { useActions, BTCtickersInfo } from '../../redux';
import { ScannerTable } from './scannerTable';
import { SidePanel } from './sidePanel';

export const Scanner = () => {
  const actions = useActions({ BTCtickersInfo });

  useEffect(() => actions.BTCtickersInfo(), []);

  return (
    <div className='container-fluid d-flex flex-row'>
      <SidePanel />
      <ScannerTable />
    </div>
  );
};
