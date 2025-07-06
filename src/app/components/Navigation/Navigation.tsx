import Link from "next/link";
import { useTranslations } from "next-intl";
import { Icon } from "../../components";
import css from "./Navigation.module.scss";

const Navigation = () => {
  const t = useTranslations("navigation");

  return (
    <nav className={css.Navigation}>
      <menu>
        <li>
          <Link href="./">
            <span className={css.Icon}>
              <Icon name="home" />
            </span>
            <span className={css.Text}>{t("library")}</span>
          </Link>
        </li>
        <li>
          <Link href="./">
            <span className={css.Icon}>
              <Icon name="search" />
            </span>
            <span className={css.Text}>{t("search")}</span>
          </Link>
        </li>
        <li>
          <Link href="./">
            <span className={css.Icon}>
              <Icon name="bookmark" fill="rgba(0,0,0,0)" />
            </span>
            <span className={css.Text}>{t("bookmarks")}</span>
          </Link>
        </li>
        <li>
          <Link href="./">
            <span className={css.Icon}>
              <Icon name="statistic" />
            </span>

            <span className={css.Text}>{t("statistic")}</span>
          </Link>
        </li>
        <li className={css.Logout}>
          <button>
            <span className={css.Icon}>
              <Icon name="logout" />
            </span>
            <span className={css.Text}>Logout</span>
          </button>
        </li>
      </menu>
    </nav>
  );
};

export default Navigation;
