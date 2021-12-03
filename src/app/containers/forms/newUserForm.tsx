import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { GenericInput } from '../../components';
import 'bootstrap/dist/css/bootstrap.min.css';

let newUser = ( props ) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form className='form-group' onSubmit={handleSubmit(newUserSubmit)}>
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

const newUserSubmit = async ( values ) => {
  const { username, password, email } = values;
  const payload = {
    username,
    password,
    email
  }
  axios.post('/api/newUser', payload)
    .then( (res) => {
      console.log(res.data);
    })
    .catch( (error) => {
      console.log(error.response.data);
    })
  ;
}


export const newUserForm = reduxForm({
  form: 'newUserForm',
})(newUser);
