import React from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Text.module.scss'

export enum TextTheme {
	DEFAULT = 'default',
	ERROR = 'error',
}

interface TextProps {
	className?: string
	title?: string
	text?: string
	theme?: TextTheme
}

export const Text = (props: TextProps) => {
	const { className, title, text, theme = TextTheme.DEFAULT } = props
	return (
		<div
			className={classNames(css.wrapper, { [css[theme]]: true }, [className])}
		>
			{title && <p className={css.title}>{title}</p>}
			{text && <p className={css.text}>{text}</p>}
		</div>
	)
}
