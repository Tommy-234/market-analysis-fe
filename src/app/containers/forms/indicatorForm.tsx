import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { GenericInput, GenericSelect } from '../../components';
import { IndicatorOptions } from '../../common';
import { useActions, newBinanceIndicator } from '../../redux';
import 'bootstrap/dist/css/bootstrap.min.css';


let IndicatorFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ newBinanceIndicator });

  return (
    <form className='form-group' onSubmit={handleSubmit(actions.newBinanceIndicator)}>
      <div className="form-row">
        <label className="col-form-label">Type</label>
        <Field
          name="type"
          component={GenericSelect}
          options={IndicatorOptions}
        />
      </div>
      <div className="form-row">
        <label className="col-form-label">Count</label>
        <Field
          name="count"
          type="number"
          component={GenericInput}
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
}

export const IndicatorForm = reduxForm({
  form: 'indicatorForm',
})(IndicatorFormRedux);
