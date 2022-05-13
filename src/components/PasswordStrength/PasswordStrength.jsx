import PasswordStrengthBar from "react-password-strength-bar";
import s from "./PasswordStrength.module.scss";
import PropTypes from "prop-types";

const PasswordStrength = ({ password }) => {
  return <PasswordStrengthBar className={s.bar} password={password} />;
};

PasswordStrength.propTypes = {
  password: PropTypes.string,
};

export default PasswordStrength;
