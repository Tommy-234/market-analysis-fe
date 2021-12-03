import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { GenericInput } from '../../components';
import { userLogin, useActions } from '../../redux'
import 'bootstrap/dist/css/bootstrap.min.css';

let Login = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ userLogin });
  return (
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

export const LoginForm = reduxForm({
  form: 'loginForm',
})(Login);
