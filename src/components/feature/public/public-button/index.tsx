import styles from "@/components/feature/public/public-button/style.module.scss";
type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger";
  children: React.ReactNode;
};
const CustomButton = ({
  className = "",
  variant = "primary",
  children,
  ...rest
}: CustomButtonProps) => {
  return (
    <button {...rest} className={styles.customBtn}>
      {children}
    </button>
  );
};
export default CustomButton;
