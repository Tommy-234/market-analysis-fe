import { useSelector } from 'react-redux';
import { DataTable } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ScannerTable = () => {
  const { tableData, fields } = useSelector( (store: any) => ({
    tableData: store.binanceScanner.tableData,
    fields: store.binanceScanner.columns
  }));

  return (
    <div className="container">
      <DataTable
        dataFields={fields}
        tableData={tableData}
      />
    </div>
  );
};
