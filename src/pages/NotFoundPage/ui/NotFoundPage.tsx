import { useTranslation } from 'react-i18next'
import css from "./NotFoundPage.module.scss"

export const NotFoundPage = () => {
  const { t } = useTranslation()
  return <div className={css.wrapper}>{"404 / "}{t('Страница не найдена')}</div>
}
