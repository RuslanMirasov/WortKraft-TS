import clsx from 'clsx';
import css from './Hero.module.scss';

interface HeroTypes {
  color?: 'grey' | 'green';
  children: React.ReactNode;
}

const Hero: React.FC<HeroTypes> = ({ color = 'grey', children }) => {
  const classes = clsx(css.Hero, color === 'grey' && css.Grey, color === 'green' && css.Green);
  return <div className={classes}>{children}</div>;
};

export default Hero;
