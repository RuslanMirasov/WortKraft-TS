import css from './Main.module.scss';

interface MainPropTypes {
  children: React.ReactNode;
}

const Main: React.FC<MainPropTypes> = ({ children }) => {
  return <main className={css.Main}>{children}</main>;
};

export default Main;
