import AuthForm from '../AuthForm/AuthForm';

const Login = ({ onLogin, requestStatus }) => {
  return (
    <main>
      <AuthForm isLoginForm={true}
                onLogin={onLogin}
                requestStatus={requestStatus}
      />
    </main>
  );
};

export default Login;
