import PasswordStrengthBar from "react-password-strength-bar";
import PropTypes from "prop-types";

import useTranslation from "assets/hooks/useTranslation";

import s from "./PasswordStrength.module.scss";

const PasswordStrength = ({ password }) => {
  const { t } = useTranslation("passwordStrength");
  return (
    <PasswordStrengthBar
      className={s.bar}
      password={password}
      shortScoreWord={t.short}
      scoreWords={[t.weak, t.weak, t.okay, t.good, t.strong]}
    />
  );
};

PasswordStrength.propTypes = {
  password: PropTypes.string,
};

export default PasswordStrength;
