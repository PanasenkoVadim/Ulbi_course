import { FC } from "react";
import classNames from "shared/lib/classNames/classNames";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import css from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  return (
    <nav className={classNames(css.nav, {}, [className])}>
      <ul>
        <li>
          <AppLink theme={AppLinkTheme.SECONDARY} to="/">Home</AppLink>
        </li>
        <li>
          <AppLink theme={AppLinkTheme.SECONDARY} to="/about">About</AppLink>
        </li>
        <li>
          <AppLink theme={AppLinkTheme.SECONDARY} to="/catalog">Catalog</AppLink>
        </li>
        <li>
          <AppLink theme={AppLinkTheme.SECONDARY} to="/contacts">Contacts</AppLink>
        </li>
      </ul>
    </nav>
  );
};
