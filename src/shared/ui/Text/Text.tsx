import React, { memo } from 'react'
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

interface TextProps {
	className?: string
	title?: string
	text?: string
	theme?: TextTheme
	align?: TextAligh
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		title,
		text,
		theme = TextTheme.DEFAULT,
		align = TextAligh.LEFT,
	} = props

	return (
		<div
			className={classNames(css.wrapper, {}, [
				className,
				css[theme],
				css[align],
			])}
		>
			{title && <p className={css.title}>{title}</p>}
			{text && <p className={css.text}>{text}</p>}
		</div>
	)
})
