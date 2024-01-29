import { useTheme } from "app/providers/ThemeProvider";
import { FC } from "react";
import classNames from "shared/lib/classNames/classNames";
import css from "./ThemeSwither.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={classNames(css.btn, {}, [className])}
    >
      <span>Light</span>
      <span
        className={classNames(css.round, { [css.switched]: theme === "dark" }, [])}
      ></span>
      <span>Dark</span>
    </button>
  );
};
