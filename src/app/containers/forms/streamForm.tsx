import { IntervalType, StreamType } from '@tommy_234/live-data';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { GenericInput, GenericSelect } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

const IntervalOptions = map(Object.keys(IntervalType), (interval: IntervalType) =>
  <option value={IntervalType[interval]}>
    {IntervalType[interval]}
  </option>
);

let StreamFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting, submit } = props;
  return (
    <form className='form-group' onSubmit={handleSubmit(submit)}>
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

const mapStateToProps = state => ({
  submit: (values) => {
    const { ticker, interval } = values;
    state.binanceAnalysis.newStream(ticker, StreamType.KLINE, interval)
      .then( () => state.binanceAnalysis.resetStream());
  }
});

StreamFormRedux = connect(mapStateToProps)(StreamFormRedux)

export const StreamForm = reduxForm({
  form: 'streamForm',
})(StreamFormRedux);
