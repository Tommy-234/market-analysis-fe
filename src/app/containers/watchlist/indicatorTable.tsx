import { useSelector } from 'react-redux';
import { DataTable } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const IndicatorTable = () => {
  const { tableData } = useSelector( (store: any) => ({
    tableData: store.binance.data
  }));
  const fields = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  return (
    <div className="container">
      {fields.length > 0 && 
        <DataTable
          dataFields={fields}
          tableData={tableData}
        />
      }
    </div>
  );
};
