import { ButtonHTMLAttributes, FC } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Button.module.scss'

export enum ThemeButton {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	theme?: ThemeButton
}

export const Button: FC<ButtonProps> = props => {
	const { className, children, theme, disabled, ...otherProps } = props

	return (
		<button
			type='button'
			disabled={disabled}
			className={classNames(css.button, { [css[theme]]: true }, [className])}
			{...otherProps}
		>
			{children}
		</button>
	)
}
