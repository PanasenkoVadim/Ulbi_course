import { FC } from "react";
import Container from "../../Container/Container";
import css from "./Header.module.scss";
import { Navbar } from "widgets/Navbar";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher/";

export const Header: FC = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <div className={css.logo}>LOGO</div>
          <ThemeSwitcher />
          <Navbar />
        </div>
      </Container>
    </header>
  );
};
