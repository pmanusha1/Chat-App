import { useLocation } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

export default function AuthPage({ setCurrentUser }) {
  const { pathname } = useLocation();

  return pathname.includes('register') ? (
    <Register />
  ) : (
    <Login setCurrentUser={setCurrentUser} />
  );
}
