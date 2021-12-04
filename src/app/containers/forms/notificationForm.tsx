import { GlobalIndicator, Stream } from '@tommy_234/live-data';
import { map, concat, get, isEmpty } from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux'
import { GenericInput, GenericSelect } from '../../components';
import { useActions, newNotification } from '../../redux';
import { CandleFields, OperatorOptions } from '../../common';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let NotificationFormRedux = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ newNotification });

  const { indicatorOptions, streamOptions } = useSelector( (store: any) => ({
    indicatorOptions:
      isEmpty(get(store, ['binance', 'manager', 'streamManager'])) ?
        map(
          store.binance.manager.streamManager.globalIndicators,
          ( indicator: GlobalIndicator ) => `${indicator.type}_${indicator.count}`
        )
      : [],
    streamOptions:
      isEmpty(get(store, ['binance', 'manager', 'streamManager'])) ?
        map(
          store.binance.manager.streamManager.streams,
          ( stream: Stream ) => stream.name
        )
      : [],
  }));

  const dataPathOptions = concat(
    map( indicatorOptions, option => 
      <option value={`indicator.${option}`}>{option}</option>
    ),
    map( CandleFields, field =>
      <option value={`currentCandle.${field}`}>{field}</option>
    )
  );

  return (
    <form className='form-group' onSubmit={handleSubmit(actions.newNotification)}>
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
          options={OperatorOptions}
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

export const NotificationForm = reduxForm({
  form: 'notificationForm',
})(NotificationFormRedux);
