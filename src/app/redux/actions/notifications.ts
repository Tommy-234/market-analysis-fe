import { Operator } from '@tommy_234/live-data';
import axios from 'axios';
import { Dispatch } from 'redux';
import { getSubscription } from '../../sw-register';

export const newNotification = (
  values: {
    dataPath: string,
    streamName: string,
    operator: Operator,
    targetValue: number
  }
) => async (
  dispatch: Dispatch
) => {
  const subscription = await getSubscription();
  const payload = {
    streamName: values.streamName,
    dataPath: values.dataPath,
    operator: values.operator,
    value: values.targetValue,
    subscription
  }
  dispatch({ type: 'NOTIFICATION_START' });
  axios.post('/api/notification', payload)
    .then( (res) => {
      dispatch({
        type: 'NOTIFICATION',
        data: res.data
      });
    })
    .catch( (error) => {
      dispatch({
        type: 'NOTIFICATION_ERROR',
        data: error
      });
    });
};
