import React, { ButtonHTMLAttributes, FC } from "react"
import classNames from "shared/lib/classNames/classNames"
import css from "./Button.module.scss"

export enum ThemeButton {
  OUTLINE = "outline",
  CLEAR = "clear",
  BLUE = "blue",
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  text?: string;
  backgroundColor?: { control: string };
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children,text, theme, ...otherProps } = props;

  return (
    <button
      type="button"
      className={classNames(css.button, { [css[theme]]: true }, [className])}
      {...otherProps}
    >
      {children}
      {text}
    </button>
  );
};
