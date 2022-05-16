// import * as yup from "yup";

// const validationsRegister = yup.object().shape({
//   username: yup
//     .string()
//     .min(1, "Name must be at least 1 characters")
//     .max(12, "Name must not contain more than 12 characters")
//     .required("Name is required"),
//   email: yup.string().email("Email is invalid").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(12, "Password must not contain more than 12 characters")
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
//       "Password must contain six characters, at least one letter and one number"
//     )
//     .required("Password is required11"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password")], "Password must match")
//     .required("Confirm password is required"),
// });

// const validationLogin = yup.object().shape({
//   email: yup.string().email("Email is invalid").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .max(12, "Password must not contain more than 12 characters")
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
//       "Password must contain six characters, at least one letter and one number"
//     )
//     .required("Password is required"),
// });

// export { validationLogin, validationsRegister };

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
