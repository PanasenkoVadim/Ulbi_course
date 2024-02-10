import { useTheme } from 'app/providers/ThemeProvider'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import css from './ThemeSwitcher.module.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  return (
        <button
          onClick={toggleTheme}
          className={classNames(css.btn, {}, [className])}
        >
          <span>{t('Светлая')}</span>
          <span
                className={classNames(
				  css.round,
				  { [css.switched]: theme === 'dark' },
				  []
                )}
            ></span>
          <span>{t('Тёмная')}</span>
      </button>
  )
}
