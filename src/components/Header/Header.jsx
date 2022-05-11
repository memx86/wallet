import Container from "components/Container";
import UserName from "components/UserName";

import { ReactComponent as Logo } from "assets/images/logo.svg";
import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <div className={s.logo}>
          <Logo />
          <span className={s.title}>Wallet</span>
        </div>
        <UserName />
      </Container>
    </header>
  );
};
export default Header;
