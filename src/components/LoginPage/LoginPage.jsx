import AuthForm, { authType } from "components/AuthForm/AuthForm";

import s from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.hero}>
            <h1 className={s.title}>Finance App</h1>
          </div>
        </div>
        <div className={s.form}>
          <AuthForm type={authType.login} />
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
