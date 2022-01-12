import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { GenericSelect } from '../../../components';
import { useActions, addScannerColumn } from '../../../redux';
import { filter, includes, map } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

let AddColumnFormRedux = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ addScannerColumn });

  const { scannerFields, btcPairs } = useSelector((store: any) => ({
    btcPairs: store.binanceScanner.btcPairs.data,
    scannerFields: store.binanceScanner.columns
  }));

  const columns = btcPairs.length > 0 ? 
    filter(
      Object.keys(btcPairs[0]),
      field => !includes(scannerFields, field))
    : [];
  const columnOptions = map(columns, columnOption => 
    <option value={columnOption}>
      {columnOption}
    </option>
  )

  console.log('AddColumnFormRedux - btcPairs.length = ', btcPairs.length);
  console.log('AddColumnFormRedux - btcPairs keys = ', btcPairs.length > 0 && Object.keys(btcPairs[0]));
  console.log('AddColumnFormRedux - columnOptions = ', columnOptions);

  return (
    <form className='form-group' onSubmit={handleSubmit(actions.addScannerColumn)}>
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
