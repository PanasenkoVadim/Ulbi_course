import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "shared/ui/Button/Button";

const HomePage = () => {
  const { t } = useTranslation("home");
  return (
    <div>
      <h1>{t("Домашняя страница")}</h1>
      <Button theme={ThemeButton.OUTLINE} >{t("Кнопка")}</Button>
    </div>
  );
};

export default HomePage;
