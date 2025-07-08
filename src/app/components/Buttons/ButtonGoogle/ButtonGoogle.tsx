import { Icon } from "./../../../components";
import "./ButtonGoogle.scss";

const ButtonGoogle = () => {
  return (
    <button className="gsi-material-button">
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <Icon name="google" />
        </div>
        <span className="gsi-material-button-contents">
          Sign in with Google
        </span>
      </div>
    </button>
  );
};

export default ButtonGoogle;
