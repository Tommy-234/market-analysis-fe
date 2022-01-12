import { FC } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { map, startCase } from 'lodash';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export type TableColumn = {
  dataField: string;
  text: string;
};

type DataTableProps = {
  tableData: any[];
  dataFields: string[];
};

export const DataTable: FC<DataTableProps> = ({ tableData, dataFields }) => (
  <BootstrapTable
    keyField='symbol'
    columns={map(dataFields, field => ({
      dataField: field,
      text: startCase(field),
      sort: true,
      onSort: (field, order) => {
        console.log('DataTable - onSort, field = ' + field, ', order = ', order);
      }
    }))}
    data={tableData}
  />
);
