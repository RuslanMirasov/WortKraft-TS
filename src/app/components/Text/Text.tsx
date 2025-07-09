import type { HTMLAttributes } from "react";
import clsx from "clsx";
import css from "./Text.module.scss";

interface TextPropTypes extends HTMLAttributes<HTMLDivElement> {
  color?: "green" | "red" | "orange" | "white" | "grey";
  align?: "center" | "right";
  size?: "big" | "small" | "subtitle";
  light?: boolean;
  children: React.ReactNode;
}

const Text: React.FC<TextPropTypes> = ({
  color,
  align,
  size,
  light,
  children,
  className,
}) => {
  const classes = clsx(
    css.Text,
    color === "green" && css.Green,
    color === "red" && css.Red,
    color === "orange" && css.Orange,
    color === "white" && css.White,
    color === "grey" && css.Grey,
    size === "small" && css.Small,
    size === "big" && css.Big,
    size === "subtitle" && css.Subtitle,
    align === "center" && css.Center,
    align === "right" && css.Right,
    light && css.Light,
    className
  );
  return <p className={classes}>{children}</p>;
};

export default Text;
