import clsx from 'clsx';
import css from './Buttons.module.scss';

interface ButtonsPropTypes {
  children: React.ReactNode;
  duration?: 'row' | 'column';
}

const Buttons: React.FC<ButtonsPropTypes> = ({ children, duration = 'row' }) => {
  const classes = clsx(css.Buttons, duration === 'column' && css.Column);

  return <div className={classes}>{children}</div>;
};

export default Buttons;
