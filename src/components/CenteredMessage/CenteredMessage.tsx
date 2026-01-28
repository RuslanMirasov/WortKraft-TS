import css from './CenteredMessage.module.scss';

interface childrenType {
  children: React.ReactNode;
}

const CenteredMessage: React.FC<childrenType> = ({ children }) => {
  return <div className={css.Message}>{children}</div>;
};

export default CenteredMessage;
