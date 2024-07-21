import { memo, useCallback } from 'react'
import classNames from 'shared/lib/classNames/classNames'
import css from './Code.module.scss'
import { Button, ButtonTheme } from '../Button/Button'
import CopyLogo from 'shared/static/images/copy.svg'
interface CodeProps {
	className?: string
	text: string
}

export const Code = memo((props: CodeProps) => {
	const { className, text } = props

	const onCopy = useCallback(() => {
		navigator.clipboard.writeText(text)
	}, [text])

	return (
		<pre className={classNames(css.code, {}, [className])}>
			<Button
				onClick={onCopy}
				className={css.copyBtn}
				theme={ButtonTheme.CLEAR}
			>
				<CopyLogo />
			</Button>
			<code>{text}</code>
		</pre>
	)
})
