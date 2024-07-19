import { useTranslation } from 'react-i18next'
import css from "./NotFoundPage.module.scss"
import { Page } from 'shared/ui/Page/Page'

export const NotFoundPage = () => {
  const { t } = useTranslation()
  return <Page className={css.wrapper}>{"404 / "}{t('Страница не найдена')}</Page>
}
