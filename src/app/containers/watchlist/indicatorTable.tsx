import { useSelector } from 'react-redux';
import { split, toUpper } from 'lodash';
import { DataTable, WrappedCandleChart } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const IndicatorTable = () => {
  const { tableData } = useSelector( (store: any) => ({
    tableData: store.binance.data
  }));

  const fields = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className="container">
      {fields.length > 0 && 
        <>
          <DataTable
            dataFields={fields}
            tableData={tableData}
            getSymbolFromRow={row => toUpper(split(row.stream, '@')[0]) }
            rowClickModalContent={<WrappedCandleChart symbol='TO_BE_INJECTED' />}
          />
        </>
      }
    </div>
  );
};
