import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { App2 } from './app2';
import { Store } from './redux';

ReactDOM.render(
  <Provider store={Store}>
    <div className='container-fluid d-flex flex-row'>
      <App2 />
    </div>
  </Provider>,
  document.getElementById('root')
);