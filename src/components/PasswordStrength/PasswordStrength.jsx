import PasswordStrengthBar from "react-password-strength-bar";
import s from "./PasswordStrength.module.scss";

const PasswordStrength = ({ password }) => {
  return <PasswordStrengthBar className={s.bar} password={password} />;
};

export default PasswordStrength;
