import { FC } from "react";
import classNames from "shared/lib/classNames/classNames";
import css from "./LangSwither.module.scss";
import { useTranslation } from "react-i18next";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: FC = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const toggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <div>
      <button onClick={toggle}>{t("Язык")}: {t("Яз")}</button>
    </div>
  );
};
