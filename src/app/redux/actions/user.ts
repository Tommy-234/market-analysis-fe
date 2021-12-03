import axios from 'axios';
import { Dispatch } from 'redux';

export const createNewUser = () => ( dispatch: Dispatch ) => {
  console.log('createNewUser action - ENTER');
  dispatch({ type: 'CREATE_NEW_USER' });
}

export const userLogin = ( values: { username: string; password: string; }) => (
  dispatch: Dispatch
): void => {
  dispatch({ type: 'USER_LOGIN_START' });
  axios.post('/api/user/login', values)
    .then( (res) => {
      dispatch({
        type: 'USER_LOGIN',
        data: res.data
      });
    })
    .catch( (error) => {
      dispatch({
        type: 'USER_LOGIN_ERROR',
        data: error
      });
    });
};
  
export const newUser = ( 
  values: {
    username: string;
    password: string;
    email: string;
  }
) => (
  dispatch: Dispatch
): void => {
  dispatch({ type: 'NEW_USER_START' });
  axios.post('/api/user', values)
    .then( (res) => {
      dispatch({
        type: 'NEW_USER',
        data: res.data
      });
    })
    .catch( (error) => {
      dispatch({
        type: 'NEW_USER_ERROR',
        data: error
      });
    });
};
  
export const userLogout = () => ({ type: 'USER_LOGOUT' });
  