import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import css from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
  const { t } = useTranslation('translation')
  return (
        <nav className={classNames(css.nav, {}, [className])}>
          <ul>
                <li>
                  <AppLink theme={AppLinkTheme.SECONDARY} to="/">{t('Главная')}</AppLink>
              </li>
                <li>
                  <AppLink theme={AppLinkTheme.SECONDARY} to="/about">{t('О нас')}</AppLink>
              </li>
                <li>
                  <AppLink theme={AppLinkTheme.SECONDARY} to="/catalog">{t('Каталог')}</AppLink>
              </li>
                <li>
                  <AppLink theme={AppLinkTheme.SECONDARY} to="/contacts">{t('Контакты')}</AppLink>
              </li>
                <li>
                  <AppLink theme={AppLinkTheme.SECONDARY} to="/test">{t('Тест')}</AppLink>
              </li>
            </ul>
      </nav>
  )
}
