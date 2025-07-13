import { Icon } from "./../../../components";
import css from "./Label.module.scss";

interface LabelProps {
  label?: string;
  required?: boolean;
  error?: string;
  icon?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  label,
  required,
  error,
  icon,
  children,
}) => {
  return (
    <label className={css.Label}>
      {label && (
        <span className={css.LabelText}>
          {label}
          {required && <span className={css.RequiredMark}>*</span>}
        </span>
      )}
      <div className={css.InputWrapper}>
        {children}
        {icon && (
          <div className={css.InputIcon}>
            <Icon name={icon} />
          </div>
        )}
      </div>
      {error && <p className={css.Error}>{error}</p>}
    </label>
  );
};

export default Label;
