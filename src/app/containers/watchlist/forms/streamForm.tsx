import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { GenericInput, GenericSelect } from '../../../components';
import { IntervalOptions } from '../../../common';
import { useActions, newBinanceStream } from '../../../redux';
import 'bootstrap/dist/css/bootstrap.min.css';

let StreamFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ newBinanceStream });

  return (
    <form className='form-group' onSubmit={handleSubmit(actions.newBinanceStream)}>
      <div className='form-row'>
        <label className="col-form-label">Ticker</label>
        <Field
          name="ticker"
          component={GenericInput}
        />
      </div>
      <div className='form-row'>
        <label className="col-form-label">Interval</label>
        <Field
          name="interval"
          component={GenericSelect}
          options={IntervalOptions}
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

export const StreamForm = reduxForm({
  form: 'streamForm',
})(StreamFormRedux);
