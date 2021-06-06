import { Table } from 'react-bootstrap';
import { connect } from 'react-redux'
import { map } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

let IndicatorTable = ( props ) => {
  const { tableData } = props;
  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  return (
    <div className="container">
      <Table className="table table-striped table-hover w-75 mt-2">
        <thead>
          <tr className="thead-dark">
            {map(columns, (column, index) =>
              <th key={`header-${index}`}>{column}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {map(tableData, (data, rowIndex) => 
            <tr key={`data-row-${rowIndex}`} id={`data-row-${rowIndex}`} className='table-data-row'>
              {map(columns, (column, colIndex) =>
                <td key={`cell-${rowIndex}-${colIndex}`}>{data[column]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = state => ({
  tableData: state.tableData
});

IndicatorTable = connect(mapStateToProps)(IndicatorTable);

export default IndicatorTable;