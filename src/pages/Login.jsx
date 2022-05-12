import AuthForm, { authType } from "components/AuthForm/AuthForm";

const Login = () => {
  return <AuthForm type={authType.login} />;
};
export default Login;
