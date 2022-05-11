import AuthForm, { authType } from "components/AuthForm/AuthForm";

const Registration = () => {
  return <AuthForm type={authType.registration} />;
};
export default Registration;
