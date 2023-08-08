import AuthForm from '../AuthForm/AuthForm';
import './Register.css';

const Register = () => {
  return (
    <main>
      <AuthForm isLoginForm={false} />
    </main>
  )
};

export default Register;
