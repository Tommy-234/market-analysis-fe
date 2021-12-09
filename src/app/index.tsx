import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { LoginWrapper } from './LoginWrapper';
import { App } from './app';
import { Store } from './redux';

ReactDOM.render(
  <Provider store={Store}>
    <LoginWrapper>
      <App />
    </LoginWrapper>
  </Provider>,
  document.getElementById('root')
);
