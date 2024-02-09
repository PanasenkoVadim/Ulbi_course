import { useTranslation } from "react-i18next";

const TestPage = () => {
  const { t } = useTranslation();
  return <div> {t("Тестовая старница")}</div>;
};
export default TestPage;
