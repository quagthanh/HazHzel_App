"use client";
import styles from "@/components/feature/auth/login/login-page/style.module.scss";
import LoginForm from "../../../../common/admin/login-form/login-form";
import AnalyticsPreview from "../../../../common/admin/login-analytics-preview";
const Login = () => {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
      <AnalyticsPreview />
    </div>
  );
};

export default Login;
