import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './src/app';
import { Store } from './src/redux';

ReactDOM.render(
  <Provider store={Store}>
    <div className='container-fluid d-flex flex-row'>
      <App/>
    </div>
  </Provider>,
  document.getElementById('root')
);
