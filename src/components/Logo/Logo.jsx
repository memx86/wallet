import { ReactComponent as LogoSVG } from "assets/images/logo.svg";
import s from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={s.logo}>
      <LogoSVG />
      <span className={s.title}>Wallet</span>
    </div>
  );
};
export default Logo;
