
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { LoginForm } from './containers';

export const LoginWrapper: FC = ({ children }) => {
  const { user } = useSelector( (store: any) => ({
    user: store.user
  }));

  return !user.loggedIn ? <LoginForm /> : <>{children}</>;
}
