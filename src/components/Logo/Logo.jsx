import PropTypes from "prop-types";

import useTranslation from "assets/hooks/useTranslation";

import sprite from "assets/images/sprite.svg";

import s from "./Logo.module.scss";

const Logo = ({ wrapperClassName = "" }) => {
  const { t } = useTranslation("logo");
  return (
    <div className={`${s.logo} ${wrapperClassName}`}>
      <svg className={s.icon}>
        <use href={`${sprite}#wallet`}></use>
      </svg>
      <span className={s.title}>{t.wallet}</span>
    </div>
  );
};
Logo.propTypes = {
  wrapperClassName: PropTypes.string,
};

export default Logo;
