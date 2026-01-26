import clsx from 'clsx';
import css from './Fieldset.module.scss';

interface fieldsetProdTypes {
  children: React.ReactNode;
  legend?: string;
  cal?: 1 | 2 | 3 | 4 | 5;
}

const Fieldset: React.FC<fieldsetProdTypes> = ({ cal, legend, children }) => {
  const classes = clsx(
    css.Fieldset,
    cal === 1 && css.Cal1,
    cal === 2 && css.Cal2,
    cal === 3 && css.Cal3,
    cal === 4 && css.Cal4,
    cal === 5 && css.Cal5
  );
  return (
    <fieldset className={classes}>
      {legend && <legend className={css.Legend}>{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
