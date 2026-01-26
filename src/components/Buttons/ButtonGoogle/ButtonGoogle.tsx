import { Icon } from "./../../../components";
import { useTranslations } from "next-intl";
import "./ButtonGoogle.scss";

const ButtonGoogle = () => {
  const t = useTranslations();
  return (
    <button className="gsi-material-button">
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Icon name="google" />
        </div>
        <span className="gsi-material-button-contents">
          {t("google-btn-text")}
        </span>
      </div>
    </button>
  );
};

export default ButtonGoogle;
