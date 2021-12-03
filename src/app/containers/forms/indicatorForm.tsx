import { IndicatorType } from '@tommy_234/live-data';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { GenericInput, GenericSelect } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

const indicatorOptions = map(Object.keys(IndicatorType), (indicator: IndicatorType) =>
  <option value={IndicatorType[indicator]}>
    {IndicatorType[indicator]}
  </option>
);

let IndicatorFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting, submit } = props;
  return (
    <form className='form-group' onSubmit={handleSubmit(submit)}>
      <div className="form-row">
        <label className="col-form-label">Type</label>
        <Field
          name="type"
          component={GenericSelect}
          options={indicatorOptions}
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

const mapStateToProps = state => ({
  submit: (values) => {
    const { type, count } = values;
    state.binanceAnalysis.streamManager.newGlobalIndicator(type, count);
  }
});

IndicatorFormRedux = connect(mapStateToProps)(IndicatorFormRedux)

export const IndicatorForm = reduxForm({
  form: 'indicatorForm',
})(IndicatorFormRedux);
