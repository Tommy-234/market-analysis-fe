import { FC, Children, ReactElement, cloneElement, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal } from 'react-bootstrap';
import { map, startCase, isEmpty } from 'lodash';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export type TableColumn = {
  dataField: string;
  text: string;
};

type DataTableProps = {
  tableData: any[];
  dataFields: string[];
  rowClickModalContent?: ReactElement;
  getSymbolFromRow?: (row: any) => string;
};

export const DataTable: FC<DataTableProps> = ({
  tableData,
  dataFields,
  rowClickModalContent,
  getSymbolFromRow
}) => {
  const [activeRow, setActiveRow] = useState('');

  return (
    <>
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
        {...getSymbolFromRow && {
          rowEvents: {
            onClick: (_: any, row: any) => setActiveRow(getSymbolFromRow(row))
          }
        }}
      />
      <Modal 
        show={!isEmpty(rowClickModalContent) && !isEmpty(activeRow)}
        onHide={() => setActiveRow('')}
      >
        <Modal.Header closeButton>
          <Modal.Title>{activeRow}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Children.map(
            rowClickModalContent,
            child => cloneElement(child, { symbol: activeRow })
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
