import { useState } from "react";
import classNames from "shared/lib/classNames/classNames";
import { LangSwitcher, ThemeSwitcher } from "widgets/Switchers";
import css from "./Sidebar.module.scss";
import MenuLogo from "shared/static/images/menuBtn.svg";
import { Button } from "shared/ui/AppButton/Button";
import { Navbar } from "widgets/Navbar";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const onOpenClick = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle("sidebar-open");
  };
  return (
    <div
      data-testid="sidebar"
      className={classNames(css.sidebar, { [css.collapsed]: collapsed }, [
        className,
      ])}
    >
      <div className={css.inner}>
        <Button className={css.button_open} onClick={onOpenClick}>
          <MenuLogo />
        </Button>
        <Navbar />
        <div className={css.switchers}>
          <LangSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
