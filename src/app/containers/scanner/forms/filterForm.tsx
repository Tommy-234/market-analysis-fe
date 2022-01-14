import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Field, FieldArray, reduxForm, WrappedFieldArrayProps } from 'redux-form';
import { GenericSelect, GenericInput } from '../../../components';
import { OperatorOptions } from '../../../common';
import { useActions, scannerFilterApply } from '../../../redux';
import { map } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

const Filter: FC<WrappedFieldArrayProps<any>> = ({ fields, meta }) => {
  const { scannerFields } = useSelector((store: any) => ({
    scannerFields: store.binanceScanner.columns
  }));

  const columnOptions = map(scannerFields, field => 
    <option value={field}>
      {field}
    </option>
  );

  return (
    <ul>
      <li>
        <Button 
          type='button'
          onClick={() => fields.push({})}>
          Add Filter
        </Button>
      </li>
      {fields.map((filter, index) => (
        <li key={index}>
          <div className='form-row'>
            <label className="col-form-label">Field</label>
            <Field
              name={`${filter}.field`}
              component={GenericSelect}
              options={columnOptions}
            />
          </div>
          <div className="form-row">
            <label className="col-form-label">Target</label>
            <Field
              name={`${filter}.target`}
              type='number'
              component={GenericInput}
            />
          </div>
          <div className="form-row">
            <label className="col-form-label">Operator</label>
            <Field
              name={`${filter}.operator`}
              component={GenericSelect}
              options={OperatorOptions}
            />
          </div>
        </li>
      ))}
      {meta.error && <li className="error">{meta.error}</li>}
    </ul>
  );
};

let ScannerFilterFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ scannerFilterApply });

  return (
    <form className='form-group' onSubmit={handleSubmit(actions.scannerFilterApply)}>
      <FieldArray name='filters' component={Filter} />
      <Button
        block
        type='submit'
        disabled={pristine || submitting}
      >
        Apply
      </Button>
    </form>
  );
};

export const ScannerFilterForm = reduxForm({
  form: 'ScannerFilterForm',
})(ScannerFilterFormRedux);
