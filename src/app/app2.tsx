
import { useSelector } from 'react-redux'
import App from './app';
import { LoginForm } from './containers'

export const App2 = () => {
  const { user } = useSelector( (store: any) => ({
    user: store.user
  }));

  return (
    <div>
      {!user.loggedIn ? (
        <LoginForm />
      ) : (
        <App />
      )}
    </div>
  );
}