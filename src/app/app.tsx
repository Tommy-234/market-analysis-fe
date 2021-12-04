import { useActions, initBinance } from './redux';
import { IndicatorTable, SidePanel } from './containers';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

let App = () => {
  const actions = useActions({ initBinance });

  useEffect(() => actions.initBinance(), []);

  return (
    <div className='container-fluid d-flex flex-row'>
      <SidePanel />
      <IndicatorTable />
    </div>
  );
}

export default App;