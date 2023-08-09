import AuthForm from '../AuthForm/AuthForm';
import './Login.css';

const Login = ({ onLogin }) => {
  return (
    <main>
      <AuthForm isLoginForm={true} onLogin={onLogin} />
    </main>
  )
};

export default Login;