import { memo } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Text.module.scss'

export enum TextTheme {
	DEFAULT = 'default',
	ERROR = 'error',
}

export enum TextAligh {
	LEFT = 'left',
	CENTER = 'center',
	RIGHT = 'right',
}
export enum TextSize {
	M = 'size_m',
	L = 'size_l',
}

interface TextProps {
	className?: string
	title?: string
	text?: string
	theme?: TextTheme
	align?: TextAligh
	size?: TextSize
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		title,
		text,
		theme = TextTheme.DEFAULT,
		align = TextAligh.LEFT,
		size = TextSize.M,
	} = props

	const mods: Array<string | undefined> = [
		className,
		css[theme],
		css[align],
		css[size],
	]

	return (
		<div className={classNames(css.wrapper, {}, mods)}>
			{title && <p className={css.title}>{title}</p>}
			{text && <p className={css.text}>{text}</p>}
		</div>
	)
})
