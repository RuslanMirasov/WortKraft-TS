import Link from "next/link";
import { Icon, LanguageSwitcher } from "../../components";
import css from "./Header.module.scss";

const Header = () => {
  return (
    <header className={css.Header}>
      <Link href="./" className={css.Logo}>
        <Icon name="logo" size="120" />
      </Link>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
