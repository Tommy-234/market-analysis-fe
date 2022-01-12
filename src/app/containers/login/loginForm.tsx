import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { GenericInput } from '../../components';
import { userLogin, useActions, newUser, createNewUser } from '../../redux';
import { NewUserForm } from './newUserForm';
import { isEmpty } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

let Login = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ userLogin, newUser, createNewUser });
  const { loginError, isCreateNewUser, isNewUser } = useSelector( (store: any) => ({
    loginError: store.user.loginError,
    isCreateNewUser: store.user.createNewUser,
    isNewUser: !isEmpty(store.user.newUser)
  }));
  return (
    <>
      {isCreateNewUser ? (
        <NewUserForm />
      ) : (
        <>
          {isNewUser && <span>User Created</span>}
          <form className='form-group' onSubmit={handleSubmit(actions.userLogin)}>
            <div className="form-row">
              <label className="col-form-label">Username</label>
              <Field
                name="username"
                component={GenericInput}
              />
            </div>
            <div className="form-row">
              <label className="col-form-label">Password</label>
              <Field
                name="password"
                component={GenericInput}
              />
            </div>
            {!isEmpty(loginError) && (
              <p>Login Error</p>
            )}
            <Button
              block
              type="button"
              onClick={() => actions.createNewUser() }
            >
              New User
            </Button>
            <Button
              block
              type="submit"
              disabled={pristine || submitting}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export const LoginForm = reduxForm({
  form: 'loginForm',
})(Login);
