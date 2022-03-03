import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DataTable, WrappedCandleChart } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ScannerTable = () => {
  
  // second parameter 'isEqual' is to prevent rendering on every websocket message.
  // TODO: fix this more elegantly
  const { tableData, fields } = useSelector( (store: any) => ({
    tableData: store.binanceScanner.tableData,
    fields: store.binanceScanner.columns
  }), isEqual);

  return (
    <div className="container">
      <DataTable
        dataFields={fields}
        tableData={tableData}
        getSymbolFromRow={row => row.symbol}
        rowClickModalContent={<WrappedCandleChart symbol='TO_BE_INJECTED' />}
      />
    </div>
  );
};
