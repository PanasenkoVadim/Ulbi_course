import { useState, type FC } from "react";
import Container from "../../Container/Container";
import css from "./Header.module.scss";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { Modal } from 'shared/ui/Modal/Modal'

export const Header: FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <div className={css.logo}>LOGO</div>
          <div className={css.actions}>
            <Button theme={ThemeButton.CLEAR} className={css.actions_btn} onClick={()=> setModalOpen(!modalOpen)}>{t("Зарегистрироваться")}</Button>
            <Button theme={ThemeButton.CLEAR} className={css.actions_btn}>{t("Войти")}</Button>
          </div>
        </div>
      </Container>
      <Modal isOpen={modalOpen} onClose={()=> setModalOpen(false)}>
        <div className={css.form}>
        <h1 className={css.form_title}>{t("Регистрация")}</h1>
          <div className={css.form_row}>
            <input type="text" />
          </div>
          <div className={css.form_row}>
            <input type="text" />
          </div>
          <div className={css.form_row}>
            <input type="text" />
          </div>
          <div className={css.form_row}>
            <textarea name="" id="" style={{resize:"none"}}></textarea>
          </div>
        </div>
      </Modal>
    </header>
  );
};
