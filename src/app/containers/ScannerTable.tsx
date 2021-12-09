import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { map } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

const fields = ['symbol', 'lastPrice', 'lowPrice', 'highPrice'];

export const ScannerTable = () => {
  const { btcPairs } = useSelector( (store: any) => ({
    btcPairs: store.binance.btcPairs.data
  }));

  return (
    <div className="container">
      <Table className="table table-striped table-hover w-75 mt-2">
        <thead>
          <tr className="thead-dark">
            {map(fields, (field, index) =>
              <th key={`header-${index}`}>{field}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {map(btcPairs, (btcPair, rowIndex) => 
            <tr key={`scan-data-row-${rowIndex}`} id={`scan-data-row-${rowIndex}`} className='table-data-row'>
              {map(fields, (field, colIndex) =>
                <td key={`scan-cell-${rowIndex}-${colIndex}`}>{btcPair[field]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
