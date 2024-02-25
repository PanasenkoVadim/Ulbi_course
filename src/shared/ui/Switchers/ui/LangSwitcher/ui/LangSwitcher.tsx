import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import css from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()
  const toggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }
  return (
        <div>
          <button className={classNames(css.btn, {}, [className])} onClick={toggle}>{t('Язык')}: {t('Яз')}</button>
      </div>
  )
}
