import Container from "components/Container";
import Logo from "components/Logo";
import UserName from "components/UserName";

import s from "./Header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <Container className={s.container}>
        <Logo />
        <UserName />
      </Container>
    </header>
  );
};
export default Header;
