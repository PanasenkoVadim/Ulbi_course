import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import css from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()
  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }
  return (
        <div>
          <button className={css.btn} onClick={toggle}>{t('Язык')}: {t('Яз')}</button>
      </div>
  )
}
