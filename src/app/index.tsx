import { AboutPage, CatalogPage, ContactsPage, HomePage } from "pages";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "widgets/Header";
import classNames from "../shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import "./styles/index.scss";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Header toggleTheme={toggleTheme} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/about"} element={<AboutPage />} />
          <Route path={"/catalog"} element={<CatalogPage />} />
          <Route path={"/contacts"} element={<ContactsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
