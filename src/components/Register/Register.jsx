import AuthForm from '../AuthForm/AuthForm';

const Register = ({ onRegister, requestStatus }) => {
  return (
    <main>
      <AuthForm isLoginForm={false}
                onRegister={onRegister}
                requestStatus={requestStatus}
      />
    </main>
  );
};

export default Register;
