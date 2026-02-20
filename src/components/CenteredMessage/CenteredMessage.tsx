import css from './CenteredMessage.module.scss';
import clsx from 'clsx';

interface childrenType {
  children: React.ReactNode;
  small?: boolean;
}

const CenteredMessage: React.FC<childrenType> = ({ children, small }) => {
  const classes = clsx(css.Message, small && css.Small);

  return <div className={classes}>{children}</div>;
};

export default CenteredMessage;
