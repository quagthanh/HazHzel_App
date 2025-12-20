"use client";

import AnalyticsPreview from "../../login-analytics-preview";
import LoginForm from "../../login-form/login-form";
import styles from "@/components/common/auth/login/login-page/style.module.scss";
const Login = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
      <AnalyticsPreview />
    </div>
  );
};

export default Login;
