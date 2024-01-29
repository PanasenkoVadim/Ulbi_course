import { Header } from "widgets/Header";
import classNames from "../shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import Router from "./providers/router";
import "./styles/index.scss";
import { Footer } from "widgets/Footer";

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Header />
      <Router />
      <Footer />
    </div>
  );
}
