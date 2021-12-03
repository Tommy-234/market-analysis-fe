import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { GenericInput } from '../../components';
import { newUser, useActions } from '../../redux';
import { isEmpty } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';

let NewUser = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  const actions = useActions({ newUser });
  const { newUserError } = useSelector( (store: any) => ({
    newUserError: store.user.newUserError
  }));
  return (
    <form className='form-group' onSubmit={handleSubmit(actions.newUser)}>
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
      <div className="form-row">
        <label className="col-form-label">Email</label>
        <Field
          name="email"
          component={GenericInput}
        />
      </div>
      {!isEmpty(newUserError) && (
        <p>New User Error</p>
      )}
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

export const NewUserForm = reduxForm({
  form: 'newUserForm',
})(NewUser);
