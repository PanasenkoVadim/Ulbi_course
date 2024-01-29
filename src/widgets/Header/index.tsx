import { FC } from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import css from "./Header.module.scss";

type HeaderProps = {
  toggleTheme: () => void;
};

const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  return (
    <div className={css.header}>
      <Container>
        <div className={css.inner}>
          <div className={css.logo}>LOGO</div>
          <button onClick={toggleTheme}>Theme</button>
          <nav className={css.nav}>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/catalog">Catalog</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">Contacts</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
