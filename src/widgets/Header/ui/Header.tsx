import { type FC } from "react";
import Container from "../../Container/Container";
import css from "./Header.module.scss";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";

export const Header: FC = () => {
  const { t } = useTranslation();
  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <div className={css.logo}>LOGO</div>
          <div className={css.actions}>
            <Button theme={ThemeButton.CLEAR} className={css.actions_btn}>{t("Зарегистрироваться")}</Button>
            <Button theme={ThemeButton.CLEAR} className={css.actions_btn}>{t("Войти")}</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
