import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { GenericSelect } from '../../../components';
import { useActions, addRemoveScannerColumn } from '../../../redux';
import { filter, includes, map, get } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

let AddColumnFormRedux = (props: InjectedFormProps) => {
  const { handleSubmit, pristine, submitting, form } = props;
  const actions = useActions({ addRemoveScannerColumn });

  const { scannerFields, tableData, addRemove } = useSelector((store: any) => ({
    tableData: store.binanceScanner.tableData,
    scannerFields: store.binanceScanner.columns,
    addRemove: get(store.form[form], ['values', 'addRemove'], 'add')
  }));

  const columns = tableData.length > 0 && addRemove != 'remove' ? 
    filter(
      Object.keys(tableData[0]),
      field => !includes(scannerFields, field))
    : scannerFields;
  
  const columnOptions = map(columns, columnOption => 
    <option value={columnOption}>
      {columnOption}
    </option>
  );

  return (
    <form className='form-group' onSubmit={handleSubmit(actions.addRemoveScannerColumn)}>
      <div className='form-row'>
        <label className="col-form-label">Add or Remove</label>
        <Field
          name="addRemove"
          component={GenericSelect}
          options={[
            <option value='add'>Add</option>,
            <option value='remove'>Remove</option>
          ]}
        />
      </div>
      <div className='form-row'>
        <label className="col-form-label">Column</label>
        <Field
          name="column"
          component={GenericSelect}
          options={columnOptions}
        />
      </div>
      <Button
        block
        type="submit"
        disabled={pristine || submitting}
      >
        Submit
      </Button>
    </form>
  );
};

export const AddColumnForm = reduxForm({
  form: 'addColumnForm',
})(AddColumnFormRedux);
