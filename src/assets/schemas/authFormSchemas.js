import * as yup from "yup";

const ValidationsReg = (t) => {
  const validationsRegister = yup.object().shape({
    username: yup
      .string()
      .min(1, t("authFormSchemas.valRegUserNameMin"))
      .max(12, t("authFormSchemas.valRegUserNameMax"))
      .required(t("authFormSchemas.valRegUserNameRequired")),
    email: yup
      .string()
      .email(t("authFormSchemas.valRegEmailEmail"))
      .required(t("authFormSchemas.valRegEmailRequired")),
    password: yup
      .string()
      .min(6, t("authFormSchemas.valRegPassMin"))
      .max(12, t("authFormSchemas.valRegPassMax"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        t("authFormSchemas.valRegPassMatches")
      )
      .required(t("authFormSchemas.valRegPassRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("authFormSchemas.valRegConfirmPassOneof"))
      .required(t("authFormSchemas.valRegConfirmPassRequired")),
  });
  return validationsRegister;
};

const ValidationLogin = (t) => {
  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email(t("authFormSchemas.valLoginEmailEmail"))
      .required(t("authFormSchemas.valLoginEmailRequired")),
    password: yup
      .string()
      .min(6, t("authFormSchemas.valLoginPassMin"))
      .max(12, t("authFormSchemas.valLoginPassMax"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        t("authFormSchemas.valLoginPassMatches")
      )
      .required(t("authFormSchemas.valLoginPassRequired")),
  });
  return validationLogin;
};

export { ValidationLogin, ValidationsReg };
