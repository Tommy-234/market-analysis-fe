import { useSelector } from 'react-redux';
import { DataTable } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ScannerTable = () => {
  const { btcPairs, fields } = useSelector( (store: any) => ({
    btcPairs: store.binanceScanner.btcPairs.data,
    fields: store.binanceScanner.columns
  }));

  return (
    <div className="container">
      <DataTable
        dataFields={fields}
        tableData={btcPairs}
      />
    </div>
  );
};
