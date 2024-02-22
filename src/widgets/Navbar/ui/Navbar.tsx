import { type FC } from "react";
import { useTranslation } from "react-i18next";
import classNames from "shared/lib/classNames/classNames";
import AppLink, { AppLinkTheme } from "shared/ui/AppLink/AppLink";
import css from "./Navbar.module.scss";
import HomeLogo from "shared/static/images/navbar/home.svg";
import AboutLogo from "shared/static/images/navbar/about.svg";
import ContactsLogo from "shared/static/images/navbar/contacts.svg";
import CatalogLogo from "shared/static/images/navbar/catalog.svg";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation("translation");
  return (
    <nav className={classNames(css.nav, {}, [className])}>
      <ul>
        <li>
          <AppLink className={css.link} theme={AppLinkTheme.SECONDARY} to={RoutePath.home}>
            <HomeLogo className={css.logo} />
            <span className={css.text}>{t("Главная")}</span>
          </AppLink>
        </li>
        <li>
          <AppLink className={css.link} theme={AppLinkTheme.SECONDARY} to={RoutePath.about}>
            <AboutLogo className={css.logo} />
            <span className={css.text}>{t("О нас")}</span>
          </AppLink>
        </li>
        <li>
          <AppLink className={css.link} theme={AppLinkTheme.SECONDARY} to={RoutePath.catalog}>
            <CatalogLogo className={css.logo} />
            <span className={css.text}>{t("Каталог")}</span>
          </AppLink>
        </li>
        <li>
          <AppLink className={css.link} theme={AppLinkTheme.SECONDARY} to={RoutePath.contacts}>
            <ContactsLogo className={css.logo} />
            <span className={css.text}>{t("Контакты")}</span>
          </AppLink>
        </li>
        {/* <li>
          <AppLink className={css.link} theme={AppLinkTheme.SECONDARY} to="/test">
            {t("Тест")}
          </AppLink>
        </li> */}
      </ul>
    </nav>
  );
};
