import { FC } from "react";
import Container from "../../Container/Container";
import css from "./Header.module.scss";
import { Navbar } from "widgets/Navbar";

type HeaderProps = {
  toggleTheme: () => void;
};

export const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          <div className={css.logo}>LOGO</div>
          <button onClick={toggleTheme}>Theme</button>
          <Navbar />
        </div>
      </Container>
    </header>
  );
};
