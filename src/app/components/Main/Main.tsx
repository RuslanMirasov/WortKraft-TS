import css from "./Main.module.scss";

interface MainPropTypes {
  children: React.ReactNode;
}

const Main: React.FC<MainPropTypes> = ({ children }) => {
  return (
    <main className={css.Main}>
      <div className={css.Container}>{children}</div>
    </main>
  );
};

export default Main;
