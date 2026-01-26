import type { JSX } from "react";
import clsx from "clsx";
import css from "./Title.module.scss";

interface TitlePropTypes {
  tag?: keyof JSX.IntrinsicElements;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
}

const Title: React.FC<TitlePropTypes> = ({ tag = "b", size, children }) => {
  const Tag = tag;
  const classes = clsx(
    css.Title,
    size === "h1" && css.H1,
    size === "h2" && css.H2,
    size === "h3" && css.H3,
    size === "h4" && css.H4,
    size === "h5" && css.H5,
    size === "h6" && css.H6
  );

  return <Tag className={classes}>{children}</Tag>;
};

export default Title;
