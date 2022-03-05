import { useEffect } from 'react';
import { useActions, initBinance } from '../../redux';
import { IndicatorTable } from './indicatorTable';
import { SidePanel } from './sidePanel';

export const WatchList = () => {
  const actions = useActions({ initBinance });

  useEffect(() => actions.initBinance(), []);
  
  return (
    <div className='container-fluid d-flex flex-row'>
      <SidePanel />
      <IndicatorTable />
    </div>
  );
};
