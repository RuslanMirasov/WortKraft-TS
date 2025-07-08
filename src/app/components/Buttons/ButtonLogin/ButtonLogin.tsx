import type { HTMLAttributes } from "react";
import { Icon } from "../../../components";
import css from "./ButtonLogin.module.scss";

interface LoginPropTypes extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonLogin: React.FC<LoginPropTypes> = ({ children, onClick }) => {
  return (
    <button className={css.ButtonLogin} onClick={onClick}>
      <Icon name="login" />
      <span>{children}</span>
    </button>
  );
};

export default ButtonLogin;
