import { Operator, GlobalIndicator, Stream } from '@tommy_234/live-data'
import { map, concat } from 'lodash';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import { getSubscription } from '../../sw-register';
import { connect } from 'react-redux'
import { GenericInput, GenericSelect } from '../../components';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const candleFields = [
  'close',
  'open',
  'volume',
  'quoteAssetVolume',
  'baseAssetBuyVolume',
  'quoteAssetBuyVolume'
];

let NotificationFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const { indicatorOptions, streamOptions } = props;

  console.log('NotificationFormRedux - enter');
  console.log(indicatorOptions, streamOptions);

  const operatorOptions = map(Object.keys(Operator), (operator: Operator) =>
    <option value={Operator[operator]}>
      {Operator[operator]}
    </option>
  );

  const dataPathOptions = concat(
    map( indicatorOptions, option => 
      <option value={`indicator.${option}`}>{option}</option>
    ),
    map( candleFields, field =>
      <option value={`currentCandle.${field}`}>{field}</option>
    )
  );

  return (
    <form className='form-group' onSubmit={handleSubmit(notificationSubmit)}>
      <div className="form-row">
        <label className="col-form-label">Stream</label>
        <Field
          name="streamName"
          component={GenericSelect}
          options={map(streamOptions, option =>
            <option value={option}>{option}</option>
          )}
        />
      </div>
      <div className="form-row">
        <label className="col-form-label">Data Path</label>
        <Field
          name="dataPath"
          component={GenericSelect}
          options={dataPathOptions}
        />
      </div>
      <div className="form-row">
        <label className="col-form-label">Operator</label>
        <Field
          name="operator"
          component={GenericSelect}
          options={operatorOptions}
        />
      </div>
      <div className="form-row">
        <label className="col-form-label">Target Value</label>
        <Field
          name="targetValue"
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

// const newNotification = async (dataPath: string, streamName: string, operator: Operator, targetValue: number) => {}
const notificationSubmit = async ( values ) => {
  const { dataPath, streamName, operator, targetValue } = values;
  const subscription = await getSubscription();
  const payload = {
    streamName,
    dataPath,
    operator,
    value: targetValue,
    subscription
  }
  axios.post('/api/notification', payload)
    .then( (res) => {
      console.log(res.data);
    })
    .catch( (error) => {
      console.log(error.response.data);
    })
  ;
}

const mapStateToProps = state => {
  const binanceAnalysis = state.binanceAnalysis;
  return {
    indicatorOptions:
      binanceAnalysis.streamManager ?
        map(
          binanceAnalysis.streamManager.globalIndicators,
          ( indicator: GlobalIndicator ) => `${indicator.type}_${indicator.count}`
        )
      : [],
    streamOptions:
      binanceAnalysis.streamManager ?
        map(
          binanceAnalysis.streamManager.streams,
          ( stream: Stream ) => stream.name
        )
      : [],
  }
};

NotificationFormRedux = connect(mapStateToProps)(NotificationFormRedux);

export const NotificationForm = reduxForm({
  form: 'notificationForm',
})(NotificationFormRedux);
