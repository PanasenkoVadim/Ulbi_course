import { useState } from "react";
import classNames from "shared/lib/classNames/classNames";
import css from "./Sidebar.module.scss";
import { ThemeSwitcher, LangSwitcher } from "widgets/Switchers";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={classNames(css.sidebar, { [css.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={css.button_wrapper}>
        <button
          className={css.button_open}
          onClick={() => setCollapsed(!collapsed)}
        >
          {"==>"}
        </button>
      </div>
      <div className={css.switchers}>
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};
