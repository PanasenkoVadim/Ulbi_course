import { useTheme } from 'app/providers/ThemeProvider'
import { FC } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './ThemeSwither.module.scss'
import { useTranslation } from 'react-i18next'

interface ThemeSwitcherProps {
	className?: string
}

export const ThemeSwitcher: FC = ({ className }: ThemeSwitcherProps) => {
	const { theme, toggleTheme } = useTheme()
	const { t } = useTranslation();
	return (
		<button
			onClick={toggleTheme}
			className={classNames(css.btn, {}, [className])}
		>
			<span>{t("Светлая")}</span>
			<span
				className={classNames(
					css.round,
					{ [css.switched]: theme === 'dark' },
					[]
				)}
			></span>
			<span>{t("Тёмная")}</span>
		</button>
	)
}
