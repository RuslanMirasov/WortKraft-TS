import { Icon } from "./../../../components";
import clsx from "clsx";
import css from "./Button.module.scss";
import Link from "next/link";

interface ButtonPropTypes {
  href?: string;
  size?: "small";
  variant?: "green" | "red" | "orange" | "white";
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonPropTypes> = ({
  onClick,
  href,
  size,
  variant,
  full,
  disabled,
  loading,
  children,
  icon,
}) => {
  const classes = clsx(
    css.Button,
    variant === "green" && css.Green,
    variant === "red" && css.Red,
    variant === "orange" && css.Orange,
    variant === "white" && css.White,
    size === "small" && css.Small,
    loading && css.Loading,
    full && css.Full
  );

  return href ? (
    <Link href={href} className={classes}>
      <span>{children}</span>
      {icon && (
        <div className={css.Icon}>
          <Icon name={icon} />
        </div>
      )}
    </Link>
  ) : (
    <button
      type={onClick ? "button" : "submit"}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{children}</span>
      {icon && (
        <div className={css.Icon}>
          <Icon name={icon} />
        </div>
      )}
    </button>
  );
};

export default Button;
