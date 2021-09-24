import React from "react";
import CustomButton from "../UI/CustomButton/CustomButton";
import classes from "./LoginPage.module.css";
import { Formik } from "formik";
import * as yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { base } from "../../base";

const LoginPage = () => {
  const login = (values) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {})
      .catch((error) => {});
  };

  const validationsSchema = yup.object().shape({
    email: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
  });

  return (
    <div className={classes.wrapper}>
      <h2>
        Войдите в свою учетную запись <span>Google</span>
      </h2>

      <p className={classes.test_data}>Тестовая почта: test@gmail.com</p>
      <p className={classes.test_data}>Тестовый пароль: testtest</p>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        onSubmit={(values) => login(values)}
        validationSchema={validationsSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
        }) => (
          <div className={classes.form}>
            <label>
              Введите почту
              <input
                className={classes.field}
                name="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Введите почту"
              />
              {touched.email && errors.email && (
                <p className={classes.error}>{errors.email}</p>
              )}
            </label>
            <label>
              Введите пароль
              <input
                className={classes.field}
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Введите пароль"
              />
              {touched.password && errors.password && (
                <p className={classes.error}>{errors.password}</p>
              )}
            </label>
            <CustomButton
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type="submit"
            >
              Войти
            </CustomButton>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
